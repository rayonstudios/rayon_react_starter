import { cn } from "@/lib/utils/styles.utils";
import { Layout } from "antd";
import React, { PropsWithChildren } from "react";

const EmptyLayout: React.FC<PropsWithChildren & { className?: string }> = ({
  children,
  className,
}) => {
  return <Layout className={cn("h-full", className)}>{children}</Layout>;
};

export default EmptyLayout;
