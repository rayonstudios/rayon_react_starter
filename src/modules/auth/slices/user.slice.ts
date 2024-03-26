import { User } from "@/lib/types/user";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ThunkStatus } from "../../../lib/types/common";
import userService from "../services/user.service";

export const name = "user";

//initial state
const initialState: {
  data?: User;
  fetchProfileStatus: ThunkStatus;
} = {
  data: undefined,
  fetchProfileStatus: ThunkStatus.IDLE,
};

const fetchProfile = createAsyncThunk(
  `${name}/fetchProfile`,
  userService.fetchProfile
);

//slice
export const userSlice = createSlice({
  name,
  initialState,
  reducers: {},
});

//action creators
export const userActions = { ...userSlice.actions, fetchProfile };
