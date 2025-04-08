import apiClient, { withApiResponseHandling } from "@/lib/openapi-fetch.config";

async function fetch() {
  const { data } = await withApiResponseHandling(apiClient.GET("/profile"));
  return data;
}

const profileService = {
  fetch,
};

export default profileService;
