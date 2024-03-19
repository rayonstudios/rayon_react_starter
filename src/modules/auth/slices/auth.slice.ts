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
} = {
  computedRoutes: undefined,
  sidebarCollapsed: false,
  isLoggedIn: true,
  loginStatus: ThunkStatus.IDLE,
  logoutStatus: ThunkStatus.IDLE,
};

const login = createAsyncThunk(`${name}/login`, authService.login);
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
});

//action creators
export const authActions = { ...authSlice.actions, login, logout };
