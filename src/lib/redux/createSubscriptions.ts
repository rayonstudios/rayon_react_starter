import { Slice, createAsyncThunk, AsyncThunk } from "@reduxjs/toolkit";
import { GenericObject } from "../types/misc";
import { AppDispatch, RootState, store } from "./store";

type SubscriptionFunction<TPayload = any> = (
  payload: TPayload,
  thunkOptions: {
    dispatch: AppDispatch;
    getState: () => RootState;
  } & GenericObject
) => Function;

type SubscriptionObject = Record<string, SubscriptionFunction<any>>;

type ExtractPayload<T> = T extends SubscriptionFunction<infer P> ? P : never;

type SubscriptionActions<T extends SubscriptionObject> = {
  [K in keyof T as `${string & K}Sub`]: AsyncThunk<
    void,
    ExtractPayload<T[K]>,
    {}
  >;
} & {
  [K in keyof T as `${string & K}Unsub`]: AsyncThunk<void, void, {}>;
};

/**
 * Creates Redux subscription actions from a slice and subscription object.
 * For each key in the subscription object, creates two async thunks:
 * - `{key}Sub`: Subscribes to the data source (payload type is inferred)
 * - `{key}Unsub`: Unsubscribes from the data source (no payload)
 *
 * @param slice - The Redux Toolkit slice
 * @param subObj - Object mapping subscription names to subscription functions
 * @returns Object with typed Sub and Unsub actions for each subscription
 *
 * @example
 * // No payload needed
 * const subscriptions = createSubscriptons(mySlice, {
 *   userBgJobs: (_payload: void, { dispatch, getState }) => {
 *     // subscription logic
 *     return unsubscribe;
 *   }
 * });
 * // Usage: dispatch(actions.userBgJobsSub())
 *
 * @example
 * // With typed payload
 * const subscriptions = createSubscriptons(mySlice, {
 *   roomMessages: (roomId: string, { dispatch, getState }) => {
 *     // subscription logic with roomId
 *     return unsubscribe;
 *   }
 * });
 * // Usage: dispatch(actions.roomMessagesSub("room-123")) // TypeScript requires string!
 */
const createSubscriptons = <T extends SubscriptionObject>(
  slice: Slice,
  subObj: T
): SubscriptionActions<T> => {
  const { name, reducer } = slice;
  slice.reducer = function (state, action) {
    for (const key in subObj) {
      if (action.type === `${name}/_register_${key}_unsubscriber_`) {
        return { ...state, [`__unsubscriber_${key}_`]: action.payload };
      }
    }
    return reducer(state, action);
  };

  const res: any = {};
  for (const key in subObj) {
    res[`${key}Unsub`] = createAsyncThunk(
      `${name}/unsub_${key}`,
      (payload, thunksOptions) => {
        const unsubscriber = (thunksOptions.getState() as any)[name][
          `__unsubscriber_${key}_`
        ];
        if (typeof unsubscriber === "function")
          unsubscriber(payload, thunksOptions);
      }
    );

    res[`${key}Sub`] = createAsyncThunk(
      `${name}/sub_${key}`,
      (payload, thunkOptions) => {
        store.dispatch(res[`${key}Unsub`]()).then(() => {
          const unsubscriber = subObj[key]?.(payload, thunkOptions as any);
          if (typeof unsubscriber === "function")
            store.dispatch({
              type: `${name}/_register_${key}_unsubscriber_`,
              payload: unsubscriber,
            });
        });
      }
    );
  }

  return res as SubscriptionActions<T>;
};

export default createSubscriptons;
