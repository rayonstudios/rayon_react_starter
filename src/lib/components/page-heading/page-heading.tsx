import { cn } from "@/lib/utils/styles.utils";
import { Typography } from "antd";
import { TitleProps } from "antd/es/typography/Title";
import React from "react";

interface Props {}

const PageHeading: React.FC<Props & TitleProps> = (props) => {
  return (
    <Typography.Title
      level={1}
      {...props}
      className={cn(
        "!text-2xl !text-text !font-semibold mt-0 !mb-6",
        props.className || ""
      )}
    />
  );
};

export default PageHeading;
