import { ThunkStatus } from "@/lib/types/misc";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "../services/user.service";
import { UserUpdateBody } from "../types/user.types";

export const name = "user";

//initial state
const initialState: {
  updateStatus: ThunkStatus;
  removeStatus: ThunkStatus;
} = {
  updateStatus: ThunkStatus.IDLE,
  removeStatus: ThunkStatus.IDLE,
};

const update = createAsyncThunk(
  `${name}/update`,
  ({ id, ...payload }: UserUpdateBody & { id: string }) =>
    userService.update(id, payload)
);

const remove = createAsyncThunk(`${name}/remove`, userService.remove);

//slice
export const userSlice = createSlice({
  name,
  initialState,
  reducers: {},
});

//action creators
export const userActions = { ...userSlice.actions, update, remove };
