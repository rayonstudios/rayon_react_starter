import { Profile } from "@/lib/types/api";
import { ThunkStatus } from "@/lib/types/misc";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import profileService from "../services/profile.service";

export const name = "profile";

//initial state
const initialState: {
  data?: Profile;
  fetchStatus: ThunkStatus;
  updateStatus: ThunkStatus;
} = {
  data: undefined,
  fetchStatus: ThunkStatus.IDLE,
  updateStatus: ThunkStatus.IDLE,
};

const fetch = createAsyncThunk(`${name}/fetch`, profileService.fetch);

const update = createAsyncThunk(`${name}/update`, profileService.update);

//slice
export const profileSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetch.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(update.fulfilled, (state, action) => {
        state.data = action.payload;
      });
  },
});

//action creators
export const profileActions = { ...profileSlice.actions, fetch, update };
