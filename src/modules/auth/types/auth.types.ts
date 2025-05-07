import { ApiBody } from "@/lib/types/api";

// Request types
export type AuthLoginBody = ApiBody<"AuthLogin">;
export type AuthForgotPasswordBody = ApiBody<"AuthForgotPassword">;
export type AuthResetPasswordBody = ApiBody<"AuthResetPassword">;
export type AuthChangePasswordBody = ApiBody<"AuthChangePassword">;
