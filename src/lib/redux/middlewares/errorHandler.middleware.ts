import { isRejectedWithValue, isRejected } from "@reduxjs/toolkit";
import { globalErrorHandler } from "../../utils/error.utils";

export const errorHandlerMiddleware = () => (next: any) => (action: any) => {
  let error: any = null;

  if ("error" in action && isRejected(action)) {
    error = { ...action.error, message: action.error.message };
  } else if ("payload" in action && isRejectedWithValue(action)) {
    error = { ...action.payload, message: action.payload?.message };
  }

  if (error) globalErrorHandler(error);

  return next(action);
};
