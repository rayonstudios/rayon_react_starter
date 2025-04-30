import axios from "@/lib/axios.config";
import { fakeApi } from "@/lib/utils/misc.utils";
import {
  ForgotPassword,
  Login,
  Password,
  ResetPassword,
} from "../types/auth.type";

async function login(data: Login) {
  return await axios.post("auth/login", data);
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

const changePassword = async (data: Password) => {
  return await axios.post("auth/changePassword", data);
};
const forgotPassword = async (data: ForgotPassword) => {
  return await axios.post("/auth/forgotPassword", data);
};

const resetPassword = async (data: ResetPassword) => {
  return await axios.post("/auth/resetPassword", data);
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
