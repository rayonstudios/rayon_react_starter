import apiClient, { withApiResponseHandling } from "@/lib/openapi-fetch.config";
import { objectToFormData } from "@/lib/utils/misc.utils";
import { ProfileUpdateBody } from "../types/profile.types";

async function fetch() {
  const { data } = await withApiResponseHandling(apiClient.GET("/profile"));
  return data;
}

async function update(payload: ProfileUpdateBody) {
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
