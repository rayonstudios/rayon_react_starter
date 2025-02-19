import { ThunkStatus } from "@/lib/types/misc";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "../services/users.service";
import { User } from "../types/user.type";

export const name = "users";

const initialState: {
  data?: User;
  fetchStatus: ThunkStatus;
  createStatus: ThunkStatus;
  updateStatus: ThunkStatus;
  removeStatus: ThunkStatus;
} = {
  data: undefined,
  fetchStatus: ThunkStatus.IDLE,
  createStatus: ThunkStatus.IDLE,
  updateStatus: ThunkStatus.IDLE,
  removeStatus: ThunkStatus.IDLE,
};

const fetch = createAsyncThunk(`${name}/fetch`, userService.fetch);
const create = createAsyncThunk(`${name}/create`, userService.create);
const update = createAsyncThunk(`${name}/update`, userService.update);
const remove = createAsyncThunk(`${name}/remove`, userService.remove);

export const userSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetch.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export const userActions = {
  ...userSlice.actions,
  fetch,
  create,
  update,
  remove,
};
