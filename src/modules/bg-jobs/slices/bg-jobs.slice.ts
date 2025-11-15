import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { bgJobsService } from "../services/bg-jobs.service";
import { ThunkStatus } from "@/lib/types/misc";
import { BgJobFirestore } from "../types/bg-jobs.types";
import createSubscriptons from "@/lib/redux/createSubscriptions";
import { firebase } from "@/lib/firebase/firebase.service";
import { COLLECTIONS } from "@/lib/firebase/firebase.types";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { toDate } from "@/lib/utils/dateTime.utils";

const name = "bgJobs";

const initialState = {
  createDemoJobStatus: ThunkStatus.IDLE,
  jobs: [] as BgJobFirestore[],
  jobsStatus: ThunkStatus.IDLE,
};

const createDemoJob = createAsyncThunk(
  `${name}/createDemoJob`,
  bgJobsService.createDemoJob
);

const bgJobsSlice = createSlice({
  name,
  initialState,
  reducers: {
    setJobsLoading: (state) => {
      state.jobs = initialState.jobs;
      state.jobsStatus = ThunkStatus.LOADING;
    },
    setJobsSuccess: (state, action) => {
      state.jobs = action.payload;
      state.jobsStatus = ThunkStatus.IDLE;
    },
    setJobsFailure: (state) => {
      state.jobsStatus = ThunkStatus.FAILED;
    },
  },
});

const subscriptions = createSubscriptons(bgJobsSlice, {
  userBgJobs: (_payload: void, { dispatch, getState }) => {
    const state = getState();
    const user = state.profile.data;

    if (!user?.id) {
      return () => {};
    }

    dispatch(bgJobsSlice.actions.setJobsLoading());
    const q = query(
      collection(firebase.db, COLLECTIONS.BG_TASKS),
      where("createdBy", "==", user.id),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const jobsData = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            createdAt: toDate(data.createdAt),
            updatedAt: toDate(data.updatedAt),
            scheduledFor: toDate(data.scheduledFor),
          } as BgJobFirestore;
        });

        dispatch(bgJobsSlice.actions.setJobsSuccess(jobsData));
      },
      (error) => {
        console.error(error);
        dispatch(bgJobsSlice.actions.setJobsFailure());
      }
    );

    return unsubscribe;
  },
});

export const bgJobsActions = {
  createDemoJob,
  ...subscriptions,
};

export default bgJobsSlice.reducer;
