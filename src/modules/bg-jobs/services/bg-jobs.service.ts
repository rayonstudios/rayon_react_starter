import apiClient, { withApiResponseHandling } from "@/lib/openapi-fetch.config";

async function createDemoJob() {
  const { data } = await withApiResponseHandling(
    apiClient.POST("/bg-jobs/demo", {})
  );

  return data;
}

export const bgJobsService = {
  createDemoJob,
};
