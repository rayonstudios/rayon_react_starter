import apiClient, { withApiResponseHandling } from "@/lib/openapi-fetch.config";
import { UserCreateBody, UserUpdateBody } from "../types/user.types";

async function fetch(id: string) {
  const { data } = await withApiResponseHandling(
    apiClient.GET("/users/{userId}", {
      params: { path: { userId: id } },
    })
  );
  return data;
}

async function create(payload: UserCreateBody) {
  const { data } = await withApiResponseHandling(
    apiClient.POST("/users", {
      body: payload,
    })
  );
  return data;
}

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
  fetch,
  create,
  update,
  remove,
};

export default userService;
