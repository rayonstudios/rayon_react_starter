import { ApiBody, ApiResponse } from "@/lib/types/api";

// Response types
export type User = ApiResponse<"UserFetch">;

// Request types
export type UserCreateBody = ApiBody<"UserCreate">;
export type UserUpdateBody = ApiBody<"UserUpdate">;
