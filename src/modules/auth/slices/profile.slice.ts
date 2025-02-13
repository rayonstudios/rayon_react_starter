import { RootState } from "@/lib/redux/store";
import { ThunkStatus } from "@/lib/types/misc";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import profileService from "../services/profile.service";
import { Profile } from "../types/profile.type";

export const name = "profile";

//initial state
const initialState: {
  data?: Profile | undefined;
  getProfileStatus: ThunkStatus;
  patchProfileStatus: ThunkStatus;
} = {
  data: undefined,
  getProfileStatus: ThunkStatus.IDLE,
  patchProfileStatus: ThunkStatus.IDLE,
};

const fetch = createAsyncThunk(`${name}/fetch`, profileService.fetch);

const patch = createAsyncThunk(`${name}/patch`, profileService.patch);

const upsertFcmToken = createAsyncThunk(
  `${name}/upsertFcmToken`,
  async (_, { getState, dispatch }) => {
    const prevTokens = (getState() as RootState).profile.data?.fcm_tokens || [];

    if (!("Notification" in window)) return;

    const perm = await Notification.requestPermission();
    if (perm === "granted") {
      const token = await profileService.getFcmToken();
      if (!prevTokens.includes(token)) {
        dispatch(
          profileActions.patch({
            fcm_token: token,
          })
        );
      }
    }
  }
);

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
      .addCase(patch.fulfilled, (state, action) => {
        state.data = action.payload;
      });
  },
});

//action creators
export const profileActions = {
  ...profileSlice.actions,
  fetch,
  patch,
  upsertFcmToken,
};
