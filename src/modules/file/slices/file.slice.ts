import { ThunkStatus } from "@/lib/types/misc";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fileService from "../services/file.service";

export const name = "file";

//initial state
const initialState: {
  saveStatus: ThunkStatus;
  removeStatus: ThunkStatus;
} = {
  saveStatus: ThunkStatus.IDLE,
  removeStatus: ThunkStatus.IDLE,
};

const save = createAsyncThunk(`${name}/save`, fileService.save);

const remove = createAsyncThunk(`${name}/remove`, fileService.remove);

//slice
export const fileSlice = createSlice({
  name,
  initialState,
  reducers: {},
});

//action creators
export const fileActions = {
  ...fileSlice.actions,
  save,
  remove,
};
