import { Role } from "@/modules/auth/hooks/role.hooks";
import NotFound from "@/pages/404/404";
import Login from "@/pages/auth/login";
import Posts from "@/pages/posts/posts";
import SamplePage from "@/pages/sample-page/sample-page";
import Settings from "@/pages/settings/settings";
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
      component: <Posts />,
      menuItem: {
        title: t("sidebar:posts"),
        icon: <BookOutlined />,
      },
      route: {
        path: "/",
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
      layoutType: "dashboard",
      authType: "private",
      component: <SamplePage title="Parent" />,
      menuItem: {
        title: "Parent",
        icon: <DashboardOutlined />,
      },
      route: {
        path: "/parent",
      },
      subRoutes: [
        {
          layoutType: "dashboard",
          authType: "private",
          component: <SamplePage title="Child 1" />,
          menuItem: {
            title: "Child 1",
            icon: <DashboardOutlined />,
          },
          route: {
            path: "child-1",
          },
        },
        {
          layoutType: "dashboard",
          authType: "private",
          component: <SamplePage title="Child 2" />,
          menuItem: {
            title: "Child 2",
            icon: <DashboardOutlined />,
          },
          route: {
            path: "child-2",
          },
          subRoutes: [
            {
              layoutType: "dashboard",
              authType: "private",
              component: <SamplePage title="Grand Child" />,
              menuItem: {
                title: "Grand Child",
                icon: <DashboardOutlined />,
              },
              route: {
                path: "grand-child",
              },
            },
          ],
        },
      ],
    },
    {
      layoutType: "dashboard",
      authType: "private",
      component: <Settings />,
      route: {
        path: "/settings",
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
