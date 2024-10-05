import { RouterConfig } from "@/lib/router/router-config";
import { ThunkStatus } from "@/lib/types/misc";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import authService from "../services/auth.service";

export const name = "auth";

//initial state
const initialState: {
  computedRoutes?: (RouterConfig & { key: string })[];
  sidebarCollapsed: boolean;
  status: "processing" | "authenticated" | "unauthenticated";
  loginStatus: ThunkStatus;
  logoutStatus: ThunkStatus;
} = {
  computedRoutes: undefined,
  sidebarCollapsed: false,
  status: "processing",
  loginStatus: ThunkStatus.IDLE,
  logoutStatus: ThunkStatus.IDLE,
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
const logout = createAsyncThunk(`${name}/logout`, async () => {
  await authService.logout();
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
});

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
export const authActions = { ...authSlice.actions, login, logout };
