import React, { PropsWithChildren } from "react";
import Sidebar from "./sidebar";
import { Layout } from "antd";
import EmptyLayout from "../EmptyLayout";
import PerfectScrollBar from "react-perfect-scrollbar";
import { createUseStyles } from "react-jss";
import Header from "./Header";
import { JSSTheme } from "../../types/common";

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
  scrollContainer: {
    "& .scrollbar-container": {
      flex: 1,
    },
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
          <Layout.Content
            className={`${classes.scrollContainer} p-8 overflow-auto flex-1 flex flex-col`}
          >
            <PerfectScrollBar>{children}</PerfectScrollBar>
          </Layout.Content>
        </Layout>
      </Layout>
    </EmptyLayout>
  );
};

export default DashboardLayout;
