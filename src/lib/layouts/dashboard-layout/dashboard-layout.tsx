import { useAppDispatch } from "@/lib/redux/store";
import { JSSTheme } from "@/lib/types/misc";
import { isDev, isTest } from "@/lib/utils/misc.utils";
import { cn } from "@/lib/utils/styles.utils";
import { profileActions } from "@/modules/auth/slices/profile.slice";
import { Layout, Typography, notification } from "antd";
import { onMessage } from "firebase/messaging";
import React, { PropsWithChildren, useEffect } from "react";
import { createUseStyles } from "react-jss";
import pkgJson from "../../../../package.json";
import NotificationPrompt from "../../components/notification-prompt/notification-prompt";
import { firebase } from "../../firebase/firebase.service";
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

  // Listen for foreground messages (when app is in focus)
  useEffect(() => {
    const unsubscribe = onMessage(firebase.messaging, (payload) => {
      console.log("notification received fg", payload);

      notification.open({
        message: payload.notification?.title || "New Notification",
        description: payload.notification?.body || "",
        placement: "topRight",
        duration: 5,
      });
    });

    return unsubscribe;
  }, []);

  return (
    <EmptyLayout>
      <Layout className={classes.root}>
        <Sidebar />
        <Layout>
          <Header />
          <Layout.Content className="p-8 flex-1 flex flex-col overflow-y-auto">
            <NotificationPrompt />
            {children}
          </Layout.Content>
          <Layout.Footer className={cn("p-4 text-center", classes.footer)}>
            <Typography.Text className="text-xs font-medium">
              Version {pkgJson.version}
              {isDev() ? " (dev)" : isTest() ? " (test)" : ""}
            </Typography.Text>
          </Layout.Footer>
        </Layout>
      </Layout>
    </EmptyLayout>
  );
};

export default DashboardLayout;
