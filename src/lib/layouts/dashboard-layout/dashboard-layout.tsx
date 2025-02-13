import { useAppDispatch } from "@/lib/redux/store";
import { JSSTheme } from "@/lib/types/misc";
import { isDev } from "@/lib/utils/misc.utils";
import { cn } from "@/lib/utils/styles.utils";
import { profileActions } from "@/modules/auth/slices/profile.slice";
import { Layout, Typography } from "antd";
import React, { PropsWithChildren, useEffect } from "react";
import { createUseStyles } from "react-jss";
import pkgJson from "../../../../package.json";
import EmptyLayout from "../empty-layout";
import Header from "./header";
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
  footer: {
    backgroundColor: theme.colorPrimaryBg,
  },
}));

const DashboardLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(profileActions.upsertFcmToken());
  }, []);

  return (
    <EmptyLayout>
      <Layout className={classes.root}>
        <Sidebar />
        <Layout>
          <Header />
          <Layout.Content className="p-8 flex-1 flex flex-col overflow-y-auto">
            {children}
          </Layout.Content>
          <Layout.Footer className={cn("p-4 text-center", classes.footer)}>
            <Typography.Text className="text-xs font-medium">
              Version {pkgJson.version}
              {isDev() ? " (dev)" : ""}
            </Typography.Text>
          </Layout.Footer>
        </Layout>
      </Layout>
    </EmptyLayout>
  );
};

export default DashboardLayout;
