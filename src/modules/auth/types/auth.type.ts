export type ResetPassword = {
  email: string;
  otp: string;
  password: string;
};
export type Login = {
  email: string;
  password: string;
};
export type ForgotPassword = {
  email: string;
};
export type Password = {
  password: string;
};
