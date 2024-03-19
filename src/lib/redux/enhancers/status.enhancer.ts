import {
  isRejectedWithValue,
  isRejected,
  isPending,
  createStore,
  StoreEnhancer,
  isFulfilled,
  Action,
} from "@reduxjs/toolkit";
import { Reducer } from "react";
import { ThunkStatus } from "../../types/common";

//@ts-ignore
export const statusHandlerEnahncer: StoreEnhancer<{}, {}> =
  (cs: typeof createStore) =>
  (
    reducer: Reducer<any, Action>,
    initialState: any,
    enhancer: StoreEnhancer
  ) => {
    const statusHandlerReducer = (state: any, action: Action) => {
      const newState = reducer(state, action);

      //get slicename and type value from action.type
      const split = action.type.split("/");
      const sliceName = split[0];
      const type = split[1];
      let status: ThunkStatus | undefined;

      //change newsState based on the sliceName, type and the status conveyed by the action
      if (isPending(action)) status = ThunkStatus.LOADING;
      else if (isFulfilled(action)) status = ThunkStatus.IDLE;
      else if (isRejected(action) || isRejectedWithValue(action))
        status = ThunkStatus.FAILED;

      if (status)
        return {
          ...newState,
          [sliceName]: { ...newState[sliceName], [type + "Status"]: status },
        };

      return newState;
    };

    return cs(statusHandlerReducer, initialState, enhancer);
  };
