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

const authService = {
  login,
  logout,
};

export default authService;
