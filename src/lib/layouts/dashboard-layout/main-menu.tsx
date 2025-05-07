import { store, useAppSelector } from "@/lib/redux/store";
import { getRoutePath } from "@/lib/router/router";
import { RouterConfig, useRouterConfig } from "@/lib/router/router-config";
import { Role, useRole } from "@/modules/auth/hooks/role.hooks";
import { authActions } from "@/modules/auth/slices/auth.slice";
import { Menu } from "antd";
import { useCallback } from "react";
import { Link, matchPath, useLocation } from "react-router-dom";
const { SubMenu } = Menu;

function getParentKeys(key: string, arr: string[] = []) {
  const lastDot = key.lastIndexOf(".");
  if (lastDot === -1) return arr;

  key = key.slice(0, lastDot);
  arr.push(key);
  return getParentKeys(key, arr);
}

export default function MainMenu({ closeOnNavigate = false, ...props }) {
  const routerConfig = useRouterConfig();
  const cr = useAppSelector((state) => state.auth.computedRoutes);
  const role = useRole();

  const menuRenderer = useCallback(
    (routes: RouterConfig[], prefix = "", basePath = "") => {
      return routes.map((route, i) => {
        if (!route.menuItem) return null;

        if (route.allowedRoles?.includes(Role.ADMIN))
          route.allowedRoles.push(Role.SUPER_ADMIN);
        if (
          Array.isArray(route.allowedRoles) &&
          !route.allowedRoles.includes(role as Role)
        )
          return null;

        const path = getRoutePath(basePath, route.route?.path || "");
        const Title = route.menuItem.title;
        const Icon = route.menuItem.icon;

        if (route.subRoutes?.filter((r) => r.menuItem).length) {
          return (
            <SubMenu
              key={prefix + i}
              icon={Icon}
              title={
                path ? (
                  <Link
                    onClick={() => {
                      if (closeOnNavigate)
                        store.dispatch(authActions.toggleSidebarCollapsed());
                    }}
                    to={path}
                  >
                    {Title}
                  </Link>
                ) : (
                  Title
                )
              }
            >
              {menuRenderer(route.subRoutes, prefix + i + ".", path)}
            </SubMenu>
          );
        }

        return (
          <Menu.Item icon={Icon} key={prefix + i}>
            <Link
              onClick={() => {
                if (closeOnNavigate)
                  store.dispatch(authActions.toggleSidebarCollapsed());
              }}
              to={path}
            >
              {Title}
            </Link>
          </Menu.Item>
        );
      });
    },
    []
  );

  const pathname = useLocation().pathname;
  const selectedKey =
    cr?.find((r) => matchPath(pathname, r.route?.path || ""))?.key || "";

  return (
    <Menu
      className="flex-1 capitalize !border-e-0"
      defaultOpenKeys={getParentKeys(selectedKey)}
      selectedKeys={[selectedKey]}
      mode="inline"
      {...props}
    >
      {menuRenderer(routerConfig)}
    </Menu>
  );
}
