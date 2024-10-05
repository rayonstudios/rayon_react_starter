import { Layout } from "antd";
import React, { PropsWithChildren } from "react";
import { createUseStyles } from "react-jss";
import { JSSTheme } from "../../types/misc";
import EmptyLayout from "../EmptyLayout";
import Header from "./Header";
import Sidebar from "./sidebar";

const useStyles = createUseStyles((theme: JSSTheme) => ({
  root: {
    "& .ant-layout-header": {
      backgroundColor: theme.colorBgContainer,
      display: "flex",
      alignItems: "center",
      lineHeight: "unset",
      padding: "0 2rem",
    },
    color: theme.colorText,
  },
}));

const DashboardLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const classes = useStyles();

  return (
    <EmptyLayout>
      <Layout className={classes.root}>
        <Sidebar />
        <Layout>
          <Header />
          <Layout.Content className="p-8 flex-1 flex flex-col overflow-y-auto">
            {children}
          </Layout.Content>
        </Layout>
      </Layout>
    </EmptyLayout>
  );
};

export default DashboardLayout;
