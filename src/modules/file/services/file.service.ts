import apiClient, { withApiResponseHandling } from "@/lib/openapi-fetch.config";
import { objectToFormData } from "@/lib/utils/misc.utils";
import { FileRemoveBody, FileSaveBody } from "../types/file.types";

const save = async (payload: FileSaveBody) => {
  const { data } = await withApiResponseHandling(
    apiClient.POST("/files", {
      body: payload,
      bodySerializer: objectToFormData,
    })
  );
  return data;
};

const remove = async (payload: FileRemoveBody) => {
  const { data } = await withApiResponseHandling(
    apiClient.DELETE("/files", {
      body: payload,
    })
  );
  return data;
};

const fileService = {
  save,
  remove,
};

export default fileService;
