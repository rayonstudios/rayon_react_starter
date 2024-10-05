import AlertPopup from "@/lib/components/alert-popup/alert-popup";
import { getErrorMessage, globalErrorHandler } from "@/lib/utils/error.utils";
import authService from "@/modules/auth/services/auth.service";
import { authActions } from "@/modules/auth/slices/auth.slice";
import axiosApi from "axios";
import { store } from "./redux/store";

export const PERMISSION_ERR_MSG =
  "You don't have permission to perform this action. Please contact your organization admin.";

const axios = axiosApi.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axios.interceptors.request.use((reqConfig) => {
  const token = localStorage.getItem("accessToken");
  if (token && !reqConfig.headers.Authorization) {
    reqConfig.headers.Authorization = `Bearer ${token}`;
  }
  return reqConfig;
});

axios.interceptors.response.use(undefined, async (error) => {
  if (error.response?.status === 403 && error.config.method !== "get") {
    AlertPopup({
      title: "Permission Denied",
      message: PERMISSION_ERR_MSG,
      cancelText: null,
      okText: "Ok",
    });
    error.message = PERMISSION_ERR_MSG;
    throw error;
  }

  let msg = getErrorMessage(
    error.response?.data?.error || error.response?.data,
    ""
  );
  if (!msg)
    msg = `${
      error.response?.statusText ? error.response.statusText + "! " : ""
    }${error.message}`;
  error.message = msg;

  if (error.response?.status === 401) {
    if (!["/auth/login", "/auth/refresh-token"].includes(error.config.url!)) {
      // retry request after refreshing token
      const { accessToken, refreshToken } = await authService.refreshToken();
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      error.config.headers.Authorization = `Bearer ${accessToken}`;
      const data = await axios(error.config);
      return data;
    } else {
      // logout
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      store.dispatch(authActions.setStatus("unauthenticated"));
    }
  }

  globalErrorHandler(error);
  throw error;
});

export default axios;
