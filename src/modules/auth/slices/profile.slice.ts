import { ThunkStatus } from "@/lib/types/misc";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import profileService from "../services/profile.service";
import { Profile } from "../types/profile.type";

export const name = "profile";

//initial state
const initialState: {
  data?: Profile;
  fetchStatus: ThunkStatus;
} = {
  data: undefined,
  fetchStatus: ThunkStatus.IDLE,
};

const fetch = createAsyncThunk(`${name}/fetch`, profileService.fetch);

//slice
export const profileSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetch.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

//action creators
export const profileActions = { ...profileSlice.actions, fetch };
