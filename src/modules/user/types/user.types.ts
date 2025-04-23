import { ApiBody, ApiResponse } from "@/lib/types/api";

export type User = ApiResponse<"UserFetch">;

export type UserUpdateBody = ApiBody<"UserUpdate">;
