import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import createSubscriptons from "../../../lib/redux/createSubscriptions";
import { ThunkStatus } from "../../../lib/types/common";
import { fakeApi } from "../../../lib/utils/misc.utils";

export const name = "dashboard";

//initial state
const initialState: {
  fakeApiCallStatus: ThunkStatus;
} = {
  fakeApiCallStatus: ThunkStatus.IDLE,
};

//async thunks
const fakeApiCall = createAsyncThunk(`${name}/fakeApiCall`, () =>
  fakeApi(() => true)
);

//slice
const dashboardSlice = createSlice({
  name,
  initialState,
  reducers: {},
});

//subscription actions
const { subAuth, unsubAuth } = createSubscriptons(dashboardSlice, {});

//action creators
export const dashboardActions = {
  ...dashboardSlice.actions,
  subAuth,
  unsubAuth,
  fakeApiCall,
};

export default dashboardSlice;
