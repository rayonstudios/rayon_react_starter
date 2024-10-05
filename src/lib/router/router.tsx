import PageSpinner from "@/lib/components/spinner/page-spinner";
import RootContextProvider from "@/lib/contexts/root.context";
import AuthLayout from "@/lib/layouts/AuthLayout";
import DashboardLayout from "@/lib/layouts/DashboardLayout";
import EmptyLayout from "@/lib/layouts/EmptyLayout";
import { useAppDispatch } from "@/lib/redux/store";
import { useAuth } from "@/modules/auth/hooks/auth.hooks";
import { authActions } from "@/modules/auth/slices/auth.slice";
import _ from "lodash";
import React, {
  PropsWithChildren,
  ReactNode,
  useEffect,
  useState,
} from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { RouterConfig, useRouterConfig } from "./router-config";

export function getRoutePath(basePath: string, currPath: string) {
  if (currPath.startsWith("/")) return currPath;
  return (basePath.endsWith("/") ? basePath : basePath + "/") + currPath;
}

const routeRenderer = (
  routes: RouterConfig[],
  prefix = "",
  basePath = "",
  parentConfig?: RouterConfig
) => {
  const allRoutes: ReactNode[] = [];
  const computedRoutes: (RouterConfig & { key: string })[] = [];

  routes.forEach((route, i) => {
    const routePath = getRoutePath(basePath, route.route?.path || "");
    if (route.subRoutes) {
      const [ar, cr] = routeRenderer(
        route.subRoutes,
        prefix + i + ".",
        routePath,
        route
      );
      allRoutes.push(...(ar as typeof allRoutes));
      computedRoutes.push(...(cr as typeof computedRoutes));
    }

    if (routePath && route.component) {
      allRoutes.push(
        <Route
          key={prefix + i}
          {...route.route}
          path={routePath}
          element={
            <AuthWrapper type={route.authType || parentConfig?.authType}>
              <LayoutWrapper
                type={route.layoutType || parentConfig?.layoutType}
              >
                {route.component}
              </LayoutWrapper>
            </AuthWrapper>
          }
        />
      );
      computedRoutes.push({
        ...route,
        key: prefix + i,
        route: { ...route.route, path: routePath },
      });
    }
  });

  return [allRoutes, computedRoutes];
};

export default function Router() {
  const routerConfig = useRouterConfig();
  const dispatch = useAppDispatch();
  const [ar, cr] = routeRenderer(routerConfig);
  dispatch(
    authActions.setComputedRoutes(cr.map((r) => _.pick(r, ["route", "key"])))
  );

  return (
    <BrowserRouter>
      <RootContextProvider>
        <Routes>{ar as ReactNode[]}</Routes>
      </RootContextProvider>
    </BrowserRouter>
  );
}

const LayoutWrapper: React.FC<
  PropsWithChildren & { type: RouterConfig["layoutType"] }
> = ({ type, children }) => {
  switch (type) {
    case "empty":
      return <EmptyLayout>{children}</EmptyLayout>;
    case "auth":
      return <AuthLayout>{children}</AuthLayout>;
    case "dashboard":
      return <DashboardLayout>{children}</DashboardLayout>;
    case "none":
    default:
      return children;
  }
};

const AuthWrapper: React.FC<
  PropsWithChildren & { type: RouterConfig["authType"] }
> = ({ type, children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isRendered, setIsRendered] = useState(false);
  const { status: authStatus } = useAuth();

  useEffect(() => {
    if (authStatus === "processing") {
      setIsRendered(false);
    } else {
      switch (type) {
        case "private":
          if (authStatus === "unauthenticated") {
            navigate("/login", { state: { from: location } });
            setIsRendered(false);
          } else {
            setIsRendered(true);
          }
          break;
        case "public":
          if (authStatus === "authenticated") {
            navigate("/", { state: { from: location } });
            setIsRendered(false); // Return null or a loading indicator
          } else {
            setIsRendered(true);
          }
          break;
        case "none":
        default:
          setIsRendered(true);
      }
    }
  }, [type, authStatus]);

  return isRendered ? children : <PageSpinner />;
};
