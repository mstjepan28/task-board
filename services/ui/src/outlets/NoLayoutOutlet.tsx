import { AuthContext } from "@services/auth";
import { Outlet } from "@services/navigation";
import { useContext } from "react";
import type { IOutletProps } from "../types/outletProps";
import { RouteGuard } from "./RouteGuard";
import { ValidatingLoginMsg } from "./ValidatingLoginMsg";

export const NoLayoutOutlet = ({ isProtected = true, reroute }: IOutletProps) => {
  const { isLoggedIn } = useContext(AuthContext);
  if (isLoggedIn === null) {
    return <ValidatingLoginMsg />;
  }

  const allowAccess = !isProtected || isLoggedIn === true;

  return (
    <RouteGuard condition={allowAccess} redirectPath={reroute ?? "/login"}>
      <Outlet />
    </RouteGuard>
  );
};
