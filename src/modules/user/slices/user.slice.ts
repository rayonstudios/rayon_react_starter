import { ThunkStatus } from "@/lib/types/misc";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "../services/user.service";
import { UserUpdateBody } from "../types/user.types";

export const name = "user";

//initial state
const initialState: {
  fetchStatus: ThunkStatus;
  createStatus: ThunkStatus;
  updateStatus: ThunkStatus;
  removeStatus: ThunkStatus;
} = {
  fetchStatus: ThunkStatus.IDLE,
  createStatus: ThunkStatus.IDLE,
  updateStatus: ThunkStatus.IDLE,
  removeStatus: ThunkStatus.IDLE,
};

const fetch = createAsyncThunk(`${name}/fetch`, userService.fetch);

const create = createAsyncThunk(`${name}/create`, userService.create);

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
export const userActions = {
  ...userSlice.actions,
  fetch,
  create,
  update,
  remove,
};
