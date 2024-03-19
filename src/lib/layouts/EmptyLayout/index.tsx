import React, { PropsWithChildren } from "react";
import { Layout } from "antd";

const EmptyLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return <Layout className="h-full">{children}</Layout>;
};

export default EmptyLayout;
