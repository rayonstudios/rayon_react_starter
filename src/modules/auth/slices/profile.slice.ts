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
    try {
      // Check if Notification API is available
      if (!("Notification" in window)) {
        console.warn("Push notifications are not supported in this browser");
        return;
      }

      // Ensure profile is loaded
      const state = getState() as RootState;
      if (!state.profile.data) {
        console.log("Fetching profile data...");
        await dispatch(fetch()).unwrap();
      }

      // Request permission
      const perm = await Notification.requestPermission();
      if (perm !== "granted") {
        console.log("Notification permission denied");
        return;
      }

      // Get FCM token
      const token = await profileService.getFcmToken();
      console.log("FCM token:", token);

      if (!token) {
        console.error("Failed to get FCM token");
        return;
      }

      // Check if token already exists
      const updatedState = getState() as RootState;
      const prevTokens = updatedState.profile.data?.fcm_tokens || [];

      if (!prevTokens.includes(token)) {
        console.log("Registering new FCM token...");
        await dispatch(
          profileActions.update({
            added_fcm_token: token,
          })
        ).unwrap();
        console.log("FCM token registered successfully");
      } else {
        console.log("FCM token already registered");
      }
    } catch (error: any) {
      console.error("Error upserting FCM token:", {
        message: error?.message,
        code: error?.code,
        response: error?.response?.data,
        status: error?.response?.status,
        details: error,
      });

      // Don't throw error to prevent app from breaking if FCM fails
      // Just log it for debugging
      console.warn(
        "FCM token registration failed, but continuing app initialization"
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
