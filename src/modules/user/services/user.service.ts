import apiClient, { withApiResponseHandling } from "@/lib/openapi-fetch.config";
import { UserUpdateBody } from "../types/user.types";

async function update(id: string, payload: UserUpdateBody) {
  const { data } = await withApiResponseHandling(
    apiClient.PATCH("/users/{userId}", {
      params: { path: { userId: id } },
      body: payload,
    })
  );
  return data;
}

async function remove(id: string) {
  const { data } = await withApiResponseHandling(
    apiClient.DELETE("/users/{userId}", {
      params: { path: { userId: id } },
    })
  );
  return data;
}

const userService = {
  update,
  remove,
};

export default userService;
