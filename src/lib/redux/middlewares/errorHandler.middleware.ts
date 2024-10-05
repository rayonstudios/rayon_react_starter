import { isRejected, isRejectedWithValue } from "@reduxjs/toolkit";
import { globalErrorHandler } from "../../utils/error.utils";

export const errorHandlerMiddleware = () => (next: any) => (action: any) => {
  let error: any = null;

  if ("error" in action && isRejected(action)) {
    error = { ...action.error, message: action.error.message };
  } else if ("payload" in action && isRejectedWithValue(action)) {
    error = { ...action.payload, message: action.payload?.message };
  }

  // Handle only non-Axios errors as Axios errors are already handled in axios.config.ts
  if (error && !error.name?.startsWith("AxiosError")) globalErrorHandler(error);

  return next(action);
};
