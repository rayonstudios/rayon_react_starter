import { useLang, useThemeMode } from "@/lib/contexts/root.context";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { JSSTheme } from "@/lib/types/misc";
import { cn } from "@/lib/utils/styles.utils";
import { authActions } from "@/modules/auth/slices/auth.slice";
import { useResponsive } from "ahooks";
import { Drawer, Layout, Typography } from "antd";
import React, { useCallback } from "react";
import { createUseStyles } from "react-jss";
import { Link } from "react-router-dom";
import MainMenu from "./main-menu";
const { Header: AntdHeader } = Layout;

const useStyles = createUseStyles((theme: JSSTheme) => ({
  sider: {
    "& .ant-layout-sider-children": {
      backgroundColor: theme.colorBgContainer,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      paddingBottom: "1rem",
    },
    "& .ant-layout-sider-trigger": {
      backgroundColor: `${theme.colorPrimaryBg} !important`,
    },
  },
}));

const { Sider } = Layout;

export const Logo: React.FC<{
  collapsed?: boolean;
  showLogoText?: boolean;
  className?: string;
}> = ({ collapsed, showLogoText = false, className }) => {
  const { themeMode } = useThemeMode();

  return (
    <Link
      to="/"
      className={cn("flex items-center justify-center space-x-2", className)}
    >
      {collapsed ? (
        <img
          alt="site-logo"
          src={
            themeMode === "light"
              ? "/logo-icon-dark.svg"
              : "/logo-icon-light.svg"
          }
          className="!h-[20px]"
        />
      ) : (
        <img alt="site-logo" src="/logo.svg" className="w-[132px]" />
      )}
      {!collapsed && showLogoText && (
        <Typography.Text>Logo Text</Typography.Text>
      )}
    </Link>
  );
};

const Sidebar: React.FC = () => {
  const classes = useStyles();
  const { md } = useResponsive();
  const dispatch = useAppDispatch();
  const collapsed = useAppSelector((state) => state.auth.sidebarCollapsed);
  const { themeMode } = useThemeMode();
  const { lang, translations } = useLang();

  const toggleCollapsed = useCallback(() => {
    dispatch(authActions.toggleSidebarCollapsed());
  }, []);

  return (
    <>
      {md ? (
        <Sider
          theme={themeMode}
          collapsible
          collapsed={collapsed}
          onCollapse={toggleCollapsed}
          width={200}
          className={classes.sider}
        >
          <AntdHeader>
            <Logo collapsed={collapsed} />
          </AntdHeader>
          <MainMenu />
        </Sider>
      ) : (
        <Drawer
          placement={translations[lang].direction === "rtl" ? "right" : "left"}
          onClose={toggleCollapsed}
          open={!collapsed}
          title={<Logo collapsed={collapsed} />}
        >
          <MainMenu />
        </Drawer>
      )}
    </>
  );
};

export default Sidebar;
