import React, { useCallback } from "react";
import { Layout, Drawer, Typography } from "antd";
import MainMenu from "./MainMenu";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { authActions } from "../../../modules/auth/slices/auth.slice";
import { useResponsive } from "ahooks";
import { createUseStyles } from "react-jss";
import { useThemeMode } from "../../contexts/root.context";
import { JSSTheme } from "../../types/common";
import { cn } from "../../utils/styles.utils";
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
  logo: {
    "& img": {
      height: 32,
      aspectRatio: "1/1",
    },
  },
}));

const { Sider } = Layout;

export const Logo: React.FC<{ collapsed: boolean; showLogoText?: boolean }> = ({
  collapsed,
  showLogoText = false,
}) => {
  const classes = useStyles();

  return (
    <Link
      to="/"
      className={cn(classes.logo, "flex items-center justify-center space-x-2")}
    >
      <img alt="site-logo" src="/vite.svg" />
      {!collapsed && showLogoText && (
        <Typography.Text>LogoText</Typography.Text>
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
            <Logo collapsed={collapsed} showLogoText />
          </AntdHeader>
          <MainMenu />
        </Sider>
      ) : (
        <Drawer
          placement={"left"}
          onClose={toggleCollapsed}
          open={!collapsed}
          title={<Logo collapsed={collapsed} showLogoText />}
        >
          <MainMenu />
        </Drawer>
      )}
    </>
  );
};

export default Sidebar;
