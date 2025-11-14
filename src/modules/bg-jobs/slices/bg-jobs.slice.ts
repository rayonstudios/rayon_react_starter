import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { bgJobsService } from "../services/bg-jobs.service";
import { ThunkStatus } from "@/lib/types/misc";

const name = "bgJobs";

const initialState = {
  createDemoJobStatus: ThunkStatus.IDLE,
};

const createDemoJob = createAsyncThunk(
  `${name}/createDemoJob`,
  bgJobsService.createDemoJob
);

const bgJobsSlice = createSlice({
  name,
  initialState,
  reducers: {},
});

export const bgJobsActions = {
  createDemoJob,
};

export default bgJobsSlice.reducer;
