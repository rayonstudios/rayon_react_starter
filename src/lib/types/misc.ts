import { GlobalToken } from "antd";

export type JSSTheme = GlobalToken & { isDark: boolean };

export enum ThunkStatus {
  IDLE = "idle",
  LOADING = "loading",
  FAILED = "failed",
}

export type GenericObject = Record<string, any>;

export type KeyValuePair = Record<string, string>;

export type Modify<T, R> = Omit<T, keyof R> & R;
