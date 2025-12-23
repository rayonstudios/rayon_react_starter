import { RootState } from "@/lib/redux/store";
import { ThunkStatus } from "@/lib/types/misc";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import profileService from "../services/profile.service";
import { Profile } from "../types/profile.types";

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

const deleteFcmtoken = createAsyncThunk(`${name}/deleteFcmtoken`, async () => {
  const token = await profileService.getFcmToken();
  if (!token) return;
  //@ts-ignore
  profileService.deleteFcmToken(token);
});

const upsertFcmToken = createAsyncThunk(
  `${name}/upsertFcmToken`,
  async (_, { getState, dispatch }) => {
    const prevTokens = (getState() as RootState).profile.data?.fcm_tokens || [];

    if (!("Notification" in window)) return;

    // Only proceed if permission is already granted or default
    // Don't automatically request permission on page load
    const currentPermission = Notification.permission;

    if (currentPermission === "denied") {
      console.log("Notification permission denied");
      return;
    }

    // If permission is already granted, get the token
    if (currentPermission === "granted") {
      const token = await profileService.getFcmToken();
      if (token && !prevTokens.includes(token)) {
        dispatch(
          profileActions.update({
            added_fcm_token: token,
          })
        );
      }
    } else {
      // Permission is "default" - log but don't request
      console.log(
        "Notification permission not yet granted. User needs to enable notifications manually."
      );
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
      .addCase(update.fulfilled, (state, action) => {
        state.data = action.payload;
      });
  },
});

//action creators
export const profileActions = {
  ...profileSlice.actions,
  fetch,
  update,
  upsertFcmToken,
  deleteFcmtoken,
};
