import { Role } from "@/modules/auth/hooks/role.hooks";
import NotFound from "@/pages/404/404";
import Login from "@/pages/auth/login";
import Home from "@/pages/home/home";
import Posts from "@/pages/posts/posts";
import Users from "@/pages/users/users";
import {
  BookOutlined,
  DashboardOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../redux/store";

export type RouterConfig = {
  layoutType?: "empty" | "auth" | "dashboard" | "none";
  authType?: "public" | "private" | "none";
  allowedRoles?: Role[];
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
  const authStatus = useAppSelector((state) => state.auth.status);

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
      layoutType: "dashboard",
      authType: "private",
      component: <Posts />,
      menuItem: {
        title: t("sidebar:posts"),
        icon: <BookOutlined />,
      },
      route: {
        path: "/posts",
      },
    },
    {
      layoutType: "dashboard",
      authType: "private",
      component: <Users />,
      menuItem: {
        title: t("sidebar:users"),
        icon: <UserOutlined />,
      },
      route: {
        path: "/users",
      },
      allowedRoles: [Role.SUPER_ADMIN],
    },
    {
      layoutType: "auth",
      authType: "public",
      component: <Login />,
      route: {
        path: "/login",
      },
    },
    {
      layoutType: authStatus === "authenticated" ? "dashboard" : "empty",
      authType: "none",
      component: <NotFound />,
      route: {
        path: "*",
      },
    },
  ];
};
