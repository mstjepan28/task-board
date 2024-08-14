import { Navigate, Outlet } from "@services/navigation";
import type { IOutletProps } from "../types/outletProps";

export const NoLayoutOutlet = ({ isProtected, reroute }: IOutletProps) => {
  const isAuthenticating = true;

  if (!isAuthenticating && isProtected) {
    return <Navigate to={reroute || "/"} replace />;
  }

  return <Outlet />;
};
