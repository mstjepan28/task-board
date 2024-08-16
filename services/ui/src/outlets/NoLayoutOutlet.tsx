import { AuthContext } from "@services/auth";
import { Outlet } from "@services/navigation";
import { useContext } from "react";
import type { IOutletProps } from "../types/outletProps";
import { RouteGuard } from "./RouteGuard";

export const NoLayoutOutlet = ({ isProtected = true, reroute }: IOutletProps) => {
  const { isLoggedIn } = useContext(AuthContext);
  const allowAccess = !isProtected || isLoggedIn;

  return (
    <RouteGuard condition={allowAccess} redirectPath={reroute ?? "/login"}>
      <Outlet />
    </RouteGuard>
  );
};
