import { ApiBody, ApiResponse } from "@/lib/types/api";

// Response types
export type Profile = ApiResponse<"ProfileFetch">;

// Request types
export type ProfileUpdateBody = ApiBody<"ProfileUpdate">;
