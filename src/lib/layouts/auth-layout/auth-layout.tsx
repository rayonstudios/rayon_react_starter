import { useThemeMode } from "@/lib/contexts/root.context";
import { Typography } from "antd";
import React, { PropsWithChildren } from "react";
import { Logo } from "../dashboard-layout/sidebar";
import EmptyLayout from "../empty-layout";

const AuthLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const { themeMode } = useThemeMode();
  return (
    <EmptyLayout className="grid place-items-center">
      <div
        className={`w-[500px] p-8 ${themeMode === "light" ? "bg-gray-50" : "bg-[#2a2a2a]"}  border-gray-200 border-solid rounded-lg space-y-8`}
      >
        <div className="m-auto w-min">
          <div className="self-center">
            <Logo className="[&_img]:w-[148px]" />
          </div>
          <Typography.Text className="text-sm block text-right relative -mt-[3px] -left-[8px] text-primary">
            Studios
          </Typography.Text>
        </div>
        {children}
      </div>
    </EmptyLayout>
  );
};

export default AuthLayout;
