import React, { PropsWithChildren } from "react";
import EmptyLayout from "../EmptyLayout";

const AuthLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return <EmptyLayout>{children}</EmptyLayout>;
};

export default AuthLayout;
