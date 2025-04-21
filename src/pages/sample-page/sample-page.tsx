import PageHeading from "@/lib/components/page-heading/page-heading";
import { Typography } from "antd";
import React from "react";

interface Props {
  title: string;
}

const SamplePage: React.FC<Props> = ({ title }) => {
  return (
    <div>
      <PageHeading>{title}</PageHeading>

      <Typography.Text>This is just a sample page</Typography.Text>
    </div>
  );
};

export default SamplePage;
