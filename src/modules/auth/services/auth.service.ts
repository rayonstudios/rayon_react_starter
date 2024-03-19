import { fakeApi } from "../../../lib/utils/misc.utils";

async function login({ email, password }: { email: string; password: string }) {
  return fakeApi(() => ({ email, password }));
}

async function logout() {
  return fakeApi(() => true);
}

const authService = {
  login,
  logout,
};

export default authService;
