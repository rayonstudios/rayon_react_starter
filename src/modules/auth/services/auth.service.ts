import axios from "@/lib/axios.config";
import { fakeApi } from "@/lib/utils/misc.utils";
import { ForgotPassword } from "../types/auth.type";

async function login({ email, password }: { email: string; password: string }) {
  return axios.post("auth/login", { email: email, password: password });
}

async function logout() {
  return fakeApi(() => true) as Promise<boolean>;
}

async function refreshToken() {
  const token = localStorage.getItem("refreshToken");
  const res = await axios.post(
    "auth/refresh",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return {
    accessToken: res.data.accessToken,
    refreshToken: res.data.refreshToken,
  };
}

const changePassword = async (password: string) => {
  const res = await axios.post<string>("auth/changePassword", password, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data;
};
const forgotPassword = async (email: string) => {
  const res = await axios.post("/auth/forgotPassword", email, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data;
};

const resetPassword = async (data: ForgotPassword) => {
  const res = await axios.post("/auth/resetPassword", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data;
};

const authService = {
  login,
  logout,
  refreshToken,
  changePassword,
  forgotPassword,
  resetPassword,
};

export default authService;
