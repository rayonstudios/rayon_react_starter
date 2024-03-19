import { configureStore } from "@reduxjs/toolkit";
import { statusHandlerEnahncer } from "./enhancers/status.enhancer";
import { errorHandlerMiddleware } from "./middlewares/errorHandler.middleware";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import dashboardSlice from "../../modules/dashboard/slices/dashboard.slice";
import { authSlice } from "../../modules/auth/slices/auth.slice";

//NOTE: require store lazily in models or dependencies of models to avoid circular dependecies
export const store = configureStore({
  reducer: {
    dashboard: dashboardSlice.reducer,
    auth: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      errorHandlerMiddleware
    ),
  enhancers: (getDefaultEnhancers) =>
    getDefaultEnhancers().concat(statusHandlerEnahncer),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
