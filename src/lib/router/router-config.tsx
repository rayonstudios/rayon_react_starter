import { DashboardOutlined } from "@ant-design/icons";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import Login from "../../pages/auth/login";
import Home from "../../pages/home/home";

export type RouterConfig = {
  layoutType?: "empty" | "auth" | "dashboard" | "none";
  authType?: "public" | "private" | "none";
  allowedRoles?: string[];
  component: ReactNode;
  menuItem?: {
    title: ReactNode;
    icon: ReactNode;
    inHeader?: boolean;
  };
  subRoutes?: RouterConfig[];
  route?: {
    path: string;
    errorElement?: ReactNode;
  };
};

export const useRouterConfig = (): RouterConfig[] => {
  const { t } = useTranslation();

  return [
    {
      layoutType: "dashboard",
      authType: "private",
      component: <Home />,
      menuItem: {
        title: t("sidebar:home"),
        icon: <DashboardOutlined />,
      },
      route: {
        path: "/",
      },
      subRoutes: [
        {
          layoutType: "dashboard",
          authType: "private",
          component: <Home />,
          menuItem: {
            title: "Home 2",
            icon: <DashboardOutlined />,
          },
          route: {
            path: "home-2",
          },
        },
        {
          layoutType: "dashboard",
          authType: "private",
          component: <Home />,
          menuItem: {
            title: "Home 3",
            icon: <DashboardOutlined />,
          },
          route: {
            path: "home-3",
          },
          subRoutes: [
            {
              layoutType: "dashboard",
              authType: "private",
              component: <Home />,
              menuItem: {
                title: "Home 3.1",
                icon: <DashboardOutlined />,
              },
              route: {
                path: "home-3.1",
              },
            },
          ],
        },
      ],
    },
    {
      layoutType: "dashboard",
      authType: "private",
      component: <Home />,
      menuItem: {
        title: "Page 2",
        icon: <DashboardOutlined />,
      },
      route: {
        path: "/page-2",
      },
    },
    {
      layoutType: "auth",
      authType: "public",
      component: <Login />,
      route: {
        path: "/login",
      },
    },
  ];
};
