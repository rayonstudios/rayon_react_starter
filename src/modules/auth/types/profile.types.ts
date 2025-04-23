import { ApiBody, ApiResponse } from "@/lib/types/api";

export type Profile = ApiResponse<"ProfileFetch">;

export type ProfileUpdateBody = ApiBody<"ProfileUpdate">;
