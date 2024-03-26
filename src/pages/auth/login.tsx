import { useAppDispatch } from "@/lib/redux/store";
import { authActions } from "@/modules/auth/slices/auth.slice";
import React from "react";

interface Props {}

const Login: React.FC<Props> = () => {
  const dispatch = useAppDispatch();

  const onSubmit = () => {
    dispatch(authActions.login({ email: "test", password: "test" }));
  };

  return <div>Login</div>;
};

export default Login;
