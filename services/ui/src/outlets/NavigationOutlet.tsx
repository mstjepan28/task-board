import { AuthContext } from "@services/auth";
import { Outlet } from "@services/navigation";
import { useContext } from "react";
import { NavigationLayout } from "../layouts/NavigationLayout";
import type { IOutletProps } from "../types/outletProps";
import { RouteGuard } from "./RouteGuard";

export const NavigationOutlet = ({ isProtected, reroute }: IOutletProps) => {
  const { isLoggedIn } = useContext(AuthContext);
  const allowAccess = !isProtected || isLoggedIn;

  return (
    <RouteGuard condition={allowAccess} redirectPath={reroute ?? "/"}>
      <NavigationLayout>
        <Outlet />
      </NavigationLayout>
    </RouteGuard>
  );
};
