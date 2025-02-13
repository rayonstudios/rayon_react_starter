import { RouterConfig } from "@/lib/router/router-config";
import { ThunkStatus } from "@/lib/types/misc";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import authService from "../services/auth.service";
import { ForgotPassword } from "../types/auth.type";

export const name = "auth";

//initial state
const initialState: {
  computedRoutes?: (RouterConfig & { key: string })[];
  sidebarCollapsed: boolean;
  status: "processing" | "authenticated" | "unauthenticated";
  loginStatus: ThunkStatus;
  logoutStatus: ThunkStatus;
  changePasswordStatus: ThunkStatus;
  resetPasswordStatus: ThunkStatus;
  forgotPasswordStatus: ThunkStatus;
} = {
  computedRoutes: undefined,
  sidebarCollapsed: false,
  status: "processing",
  loginStatus: ThunkStatus.IDLE,
  logoutStatus: ThunkStatus.IDLE,
  changePasswordStatus: ThunkStatus.IDLE,
  resetPasswordStatus: ThunkStatus.IDLE,
  forgotPasswordStatus: ThunkStatus.IDLE,
};

const login = createAsyncThunk(
  `${name}/login`,
  async (data: Parameters<typeof authService.login>[0]) => {
    const res = await authService.login(data);
    localStorage.setItem("accessToken", res.data.accessToken);
    localStorage.setItem("refreshToken", res.data.refreshToken);
    return res;
  }
);
const logout = createAsyncThunk(`${name}/logout`, async () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
});
const changePassword = createAsyncThunk(
  `${name}/changePassword`,
  async (password: string) => {
    return await authService.changePassword(password);
  }
);
const forgotPassword = createAsyncThunk(
  `${name}/forgotPassword`,
  async (email: string) => {
    return await authService.forgotPassword(email);
  }
);
const resetPassword = createAsyncThunk(
  `${name}/resetPassword`,
  async (data: ForgotPassword) => {
    return await authService.resetPassword(data);
  }
);

//slice
export const authSlice = createSlice({
  name,
  initialState,
  reducers: {
    toggleSidebarCollapsed(state) {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    setComputedRoutes(state, action) {
      state.computedRoutes = action.payload;
    },
    setStatus(state, action: PayloadAction<(typeof initialState)["status"]>) {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state) => {
      state.status = "authenticated";
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.status = "unauthenticated";
    });
  },
});

//action creators
export const authActions = {
  ...authSlice.actions,
  login,
  logout,
  changePassword,
  forgotPassword,
  resetPassword,
};
