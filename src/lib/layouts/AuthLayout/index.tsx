import { Typography } from "antd";
import React, { PropsWithChildren } from "react";
import EmptyLayout from "../EmptyLayout";

const AuthLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <EmptyLayout className="grid place-items-center">
      <div className="w-[500px] p-8 bg-gray-50 border-gray-200 border-solid rounded-lg space-y-8">
        <div className="m-auto w-min">
          <img
            alt="site logo"
            src="/logo.svg"
            className="w-[160px] self-center"
          />
          <Typography.Text className="text-sm block text-right mt-[2px] text-text">
            Admin Panel
          </Typography.Text>
        </div>
        {children}
      </div>
    </EmptyLayout>
  );
};

export default AuthLayout;
