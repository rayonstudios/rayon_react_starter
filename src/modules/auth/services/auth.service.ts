import { firebase, getFirebaseEmail } from "@/lib/firebase/firebase.service";
import apiClient, { withApiResponseHandling } from "@/lib/openapi-fetch.config";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import {
  AuthChangePasswordBody,
  AuthForgotPasswordBody,
  AuthLoginBody,
  AuthResetPasswordBody,
} from "../types/auth.types";

async function login(payload: AuthLoginBody) {
  const [{ data }] = await Promise.all([
    withApiResponseHandling(apiClient.POST("/auth/login", { body: payload })),
    firebase.isEnabled &&
      signInWithEmailAndPassword(
        firebase.auth,
        getFirebaseEmail(payload.email),
        payload.password
      ).catch(console.error),
  ]);
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

async function logout() {
  if (firebase.isEnabled) {
    await signOut(firebase.auth).catch(console.error);
  }
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
}

const authService = {
  login,
  logout,
  refreshToken,
  changePassword,
  forgotPassword,
  resetPassword,
};

export default authService;
