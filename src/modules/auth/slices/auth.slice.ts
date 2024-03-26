import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RouterConfig } from "../../../lib/router/router-config";
import { ThunkStatus } from "../../../lib/types/common";
import authService from "../services/auth.service";

export const name = "auth";

//initial state
const initialState: {
  computedRoutes?: (RouterConfig & { key: string })[];
  sidebarCollapsed: boolean;
  isLoggedIn?: boolean;
  loginStatus: ThunkStatus;
  logoutStatus: ThunkStatus;
  accessToken?: string;
  refreshToken?: string;
} = {
  computedRoutes: undefined,
  sidebarCollapsed: false,
  isLoggedIn: true,
  loginStatus: ThunkStatus.IDLE,
  logoutStatus: ThunkStatus.IDLE,
  accessToken: undefined,
  refreshToken: undefined,
};

const login = createAsyncThunk(
  `${name}/login`,
  async (data: Parameters<typeof authService.login>[0]) => {
    const res = await authService.login(data);
    localStorage.setItem("accessToken", res.accessToken);
    localStorage.setItem("refreshToken", res.refreshToken);
    return res;
  }
);
const logout = createAsyncThunk(`${name}/logout`, authService.logout);

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
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    });
  },
});

//action creators
export const authActions = { ...authSlice.actions, login, logout };
