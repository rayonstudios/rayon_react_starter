import { Slice, createAsyncThunk } from "@reduxjs/toolkit";
import { GenericObject } from "../types/misc";
import { AppDispatch, RootState, store } from "./store";

const createSubscriptons = (
  slice: Slice,
  subObj: {
    [key: string]: (
      payload: any,
      thunkOptions: {
        dispatch: AppDispatch;
        getState: RootState;
      } & GenericObject
    ) => Function;
  }
) => {
  const { name, reducer } = slice;
  slice.reducer = function (state, action) {
    for (let key in subObj) {
      if (action.type === `${name}/_register_${key}_unsubscriber_`) {
        return { ...state, [`__unsubscriber_${key}_`]: action.payload };
      }
    }
    return reducer(state, action);
  };

  const res: GenericObject = {};
  for (let key in subObj) {
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
          const unsubscriber = subObj[key](payload, thunkOptions as any);
          if (typeof unsubscriber === "function")
            store.dispatch({
              type: `${name}/_register_${key}_unsubscriber_`,
              payload: unsubscriber,
            });
        });
      }
    );
  }

  return res;
};

export default createSubscriptons;
