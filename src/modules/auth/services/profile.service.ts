import apiClient, { withApiResponseHandling } from "@/lib/openapi-fetch.config";
import { ApiBody } from "@/lib/types/api";
import { objectToFormData } from "@/lib/utils/misc.utils";

async function fetch() {
  const { data } = await withApiResponseHandling(apiClient.GET("/profile"));
  return data;
}

async function update(payload: ApiBody<"ProfileUpdate">) {
  const { data } = await withApiResponseHandling(
    apiClient.PATCH("/profile", {
      body: payload,
      bodySerializer: objectToFormData,
    })
  );
  return data;
}

const profileService = {
  fetch,
  update,
};

export default profileService;
