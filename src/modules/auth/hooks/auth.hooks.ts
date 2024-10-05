import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { ThunkStatus } from "@/lib/types/misc";
import { authActions } from "@/modules/auth/slices/auth.slice";
import { useLocalStorageState } from "ahooks";
import { useCallback, useEffect } from "react";

const serializer = (val: string) => val;

export const useAuth = () => {
  const [accessToken] = useLocalStorageState<string>("accessToken", {
    listenStorageChange: true,
    serializer,
    deserializer: serializer,
  });
  const [refreshToken] = useLocalStorageState<string>("refreshToken", {
    listenStorageChange: true,
    serializer,
    deserializer: serializer,
  });
  const { status, loginLoading, logoutLoading } = useAppSelector((state) => ({
    status: state.auth.status,
    loginLoading: state.auth.loginStatus === ThunkStatus.LOADING,
    logoutLoading: state.auth.logoutStatus === ThunkStatus.LOADING,
  }));
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status !== "authenticated" && accessToken)
      dispatch(authActions.setStatus("authenticated"));
    else if (status !== "unauthenticated" && !accessToken)
      dispatch(authActions.setStatus("unauthenticated"));
  }, [accessToken]);

  const login = useCallback((...args: Parameters<typeof authActions.login>) => {
    return dispatch(authActions.login(...args));
  }, []);

  const logout = useCallback(
    (...args: Parameters<typeof authActions.logout>) => {
      return dispatch(authActions.logout(...args));
    },
    []
  );

  return {
    accessToken,
    refreshToken,
    status,
    login,
    loginLoading,
    logout,
    logoutLoading,
  };
};
