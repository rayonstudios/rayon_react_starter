import apiClient, { withApiResponseHandling } from "@/lib/openapi-fetch.config";
import { AuthChangePasswordBody, AuthLoginBody } from "../types/auth.types";

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

const authService = {
  login,
  refreshToken,
  changePassword,
};

export default authService;
