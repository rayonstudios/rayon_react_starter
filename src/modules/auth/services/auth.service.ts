import { fakeApi } from "@/lib/utils/misc.utils";

async function login(_: { email: string; password: string }) {
  return fakeApi(() => ({
    accessToken: "accessToken",
    refreshToken: "refreshToken",
  })) as Promise<{ accessToken: string; refreshToken: string }>;
}

async function logout() {
  return fakeApi(() => true) as Promise<boolean>;
}

async function refreshToken() {
  return fakeApi(() => ({
    accessToken: "accessToken",
    refreshToken: "refreshToken",
  })) as Promise<{ accessToken: string; refreshToken: string }>;
}

const authService = {
  login,
  logout,
  refreshToken,
};

export default authService;
