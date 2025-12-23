import { globalErrorHandler } from "@/lib/utils/error.utils";
import { AxiosError } from "axios";
import createClient from "openapi-fetch";
import axios from "./axios.config";
import { paths } from "./types/openapi-fetch";

export const PERMISSION_ERR_MSG =
  "You don't have permission to perform this action. Please contact your organization admin.";

// Create enhanced client by wrapping Axios as the fetch implementation
const apiClient = createClient<paths>({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  // Use Axios as the fetch implementation with correct signature
  fetch: async (input: Request) => {
    try {
      // Extract request details from the Request object
      const url = input.url;
      const method = input.method.toLowerCase();
      const headers = Object.fromEntries(input.headers.entries());

      // Handle request body based on content type
      let data = undefined;
      if (input.body) {
        const contentType = input.headers.get("Content-Type");
        console.log("Request Content-Type:", contentType);

        if (contentType?.includes("application/json")) {
          data = await input.json();
        } else if (contentType?.includes("multipart/form-data")) {
          data = await input.formData();
          // Remove Content-Type header for FormData - let axios set it with boundary
          delete headers["content-type"];
          delete headers["Content-Type"];
        } else {
          data = input.body;
        }
      }

      console.log("Axios request config:", {
        url: url.replace(import.meta.env.VITE_API_BASE_URL, ""),
        method,
        hasData: !!data,
        dataType: data?.constructor?.name,
        headers: Object.keys(headers),
      });

      // Convert fetch API request to Axios format
      const axiosConfig = {
        url: url.replace(import.meta.env.VITE_API_BASE_URL, ""), // Remove base URL as axios config already has it
        method,
        headers,
        data,
      };

      // Use our configured axios instance to make the request
      const response = await axios.request(axiosConfig);

      // Convert Axios response format back to fetch Response format
      return new Response(JSON.stringify(response.data), {
        status: response.status || 200,
        statusText: response.statusText || "",
      });
    } catch (error) {
      // Axios error handling is already done in axios.config.ts
      // Here we just convert it to a Response object for openapi-fetch
      const axiosError = error as AxiosError;
      return new Response(
        JSON.stringify(
          axiosError?.response?.data ?? { error: "Network Error" }
        ),
        {
          status: axiosError?.response?.status || 500,
          statusText: axiosError?.response?.statusText || "Error",
        }
      );
    }
  },
});

apiClient.use({
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
    throw {
      message: (error as any)?.error ?? error ?? data?.error,
      name: "AxiosError",
    };
  }

  const result = {
    data: data.data,
    response,
  };

  return result;
}

export default apiClient;
