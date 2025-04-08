import AlertPopup from "@/lib/components/alert-popup/alert-popup";
import { globalErrorHandler } from "@/lib/utils/error.utils";
import authService from "@/modules/auth/services/auth.service";
import { authActions } from "@/modules/auth/slices/auth.slice";
import createClient from "openapi-fetch";
import { store } from "./redux/store";
import { paths } from "./types/openapi-fetch";

export const PERMISSION_ERR_MSG =
  "You don't have permission to perform this action. Please contact your organization admin.";

// Create enhanced client by wrapping the fetch implementation
const apiClient = createClient<paths>({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.use({
  async onRequest({ request }) {
    const token = localStorage.getItem("accessToken");
    if (token && !request.headers.has("Authorization")) {
      request.headers.set("Authorization", `Bearer ${token}`);
    }

    return request;
  },
  async onResponse({ request, response }) {
    if (response.ok) {
      return response;
    }

    if (response.status === 403 && request.method !== "GET") {
      AlertPopup({
        title: "Permission Denied",
        message: PERMISSION_ERR_MSG,
        cancelText: null,
        okText: "Ok",
      });
      return response;
    }

    if (response.status === 401) {
      let shouldLogout = false;

      if (!["auth/login", "auth/refresh"].includes(request.url)) {
        try {
          // Retry request after refreshing token
          const { accessToken, refreshToken } = await authService.refreshToken(
            localStorage.getItem("refreshToken")!
          );
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);

          // Create a new request with the fresh token
          const newRequest = new Request(request, {
            headers: new Headers(request.headers),
          });
          newRequest.headers.set("Authorization", `Bearer ${accessToken}`);

          // Retry the original request with the new token
          return fetch(newRequest);
        } catch (e) {
          shouldLogout = true;
        }
      } else {
        shouldLogout = true;
      }

      if (shouldLogout) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        store.dispatch(authActions.setStatus("unauthenticated"));
        return response;
      }
    }

    // Try to parse error message from response
    let errorData;
    try {
      errorData = await response.clone().json();
    } catch {
      errorData = null;
    }

    globalErrorHandler(errorData?.error || errorData);
    return response;
  },

  async onError({ error }) {
    globalErrorHandler(error);
  },
});

export async function withApiResponseHandling<T, E = unknown>(
  request: Promise<{
    data?: { data: T; error: string | null };
    error?: E;
    response: Response;
  }>
): Promise<{
  data: NonNullable<T>;
  response: Response;
}> {
  const { data, error, response } = await request;

  if (error || data?.error || !data?.data) {
    throw error ?? data?.error;
  }

  const result = {
    data: data.data,
    response,
  };

  return result;
}

export default apiClient;
