import { AuthContext } from "@services/auth";
import { Outlet } from "@services/navigation";
import { useContext } from "react";
import { NavigationLayout } from "../layouts/NavigationLayout";
import type { IOutletProps } from "../types/outletProps";
import { RouteGuard } from "./RouteGuard";

export const NavigationOutlet = ({ isProtected = true, reroute }: IOutletProps) => {
  const { isLoggedIn } = useContext(AuthContext);
  if (isLoggedIn === null) {
    return null;
  }

  const allowAccess = !isProtected || isLoggedIn === true;

  return (
    <RouteGuard condition={allowAccess} redirectPath={reroute ?? "/login"}>
      <NavigationLayout>
        <Outlet />
      </NavigationLayout>
    </RouteGuard>
  );
};
