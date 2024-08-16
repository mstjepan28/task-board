import { AuthContext } from "@services/auth";
import { Outlet } from "@services/navigation";
import { useContext } from "react";
import type { IOutletProps } from "../types/outletProps";
import { RouteGuard } from "./RouteGuard";

interface IProps extends Omit<IOutletProps, "isProtected"> {}

export const UnauthenticatedOutlet = ({ reroute }: IProps) => {
  const { isLoggedIn } = useContext(AuthContext);
  const allowAccess = !isLoggedIn;

  return (
    <RouteGuard condition={allowAccess} redirectPath={reroute ?? "/"}>
      <Outlet />
    </RouteGuard>
  );
};
