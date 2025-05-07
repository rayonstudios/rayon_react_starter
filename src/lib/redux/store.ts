import { authSlice } from "@/modules/auth/slices/auth.slice";
import { profileSlice } from "@/modules/auth/slices/profile.slice";
import { fileSlice } from "@/modules/file/slices/file.slice";
import { userSlice } from "@/modules/user/slices/user.slice";
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { statusHandlerEnahncer } from "./enhancers/status.enhancer";
import { errorHandlerMiddleware } from "./middlewares/errorHandler.middleware";

//NOTE: require store lazily in models or dependencies of models to avoid circular dependecies
export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    profile: profileSlice.reducer,
    user: userSlice.reducer,
    file: fileSlice.reducer,
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
