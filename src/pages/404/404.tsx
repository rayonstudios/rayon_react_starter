import { Typography } from "antd";
import React from "react";

interface Props {}

const NotFound: React.FC<Props> = () => {
  return (
    <div className="h-full grid place-items-center">
      <Typography.Title level={1}>Not Found 😕</Typography.Title>
    </div>
  );
};

export default NotFound;
