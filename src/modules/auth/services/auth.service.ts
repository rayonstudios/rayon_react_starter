import apiClient, { withApiResponseHandling } from "@/lib/openapi-fetch.config";
import {
  AuthChangePasswordBody,
  AuthForgotPasswordBody,
  AuthLoginBody,
  AuthResetPasswordBody,
} from "../types/auth.types";

async function login(payload: AuthLoginBody) {
  const { data } = await withApiResponseHandling(
    apiClient.POST("/auth/login", { body: payload })
  );
  return data;
}

async function refreshToken(refreshToken: string) {
  const { data } = await withApiResponseHandling(
    apiClient.POST("/auth/refresh", {
      headers: {
        authorization: `Bearer ${refreshToken}`,
      },
    })
  );
  return data;
}

async function changePassword(payload: AuthChangePasswordBody) {
  const { data: response } = await withApiResponseHandling(
    apiClient.POST("/auth/change-password", { body: payload })
  );
  return response;
}

async function forgotPassword(payload: AuthForgotPasswordBody) {
  const { data: response } = await withApiResponseHandling(
    apiClient.POST("/auth/forgot-password", { body: payload })
  );
  return response;
}

async function resetPassword(payload: AuthResetPasswordBody) {
  const { data: response } = await withApiResponseHandling(
    apiClient.POST("/auth/reset-password", { body: payload })
  );
  return response;
}

const authService = {
  login,
  refreshToken,
  changePassword,
  forgotPassword,
  resetPassword,
};

export default authService;
