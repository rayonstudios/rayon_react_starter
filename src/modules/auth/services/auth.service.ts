import apiClient, { withApiResponseHandling } from "@/lib/openapi-fetch.config";
import { ApiBody } from "@/lib/types/api";

async function login(payload: ApiBody<"AuthLogin">) {
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

const authService = {
  login,
  refreshToken,
};

export default authService;
