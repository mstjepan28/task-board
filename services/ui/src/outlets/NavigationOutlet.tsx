import { Navigate, Outlet } from "@services/navigation";
import type { IOutletProps } from "../types/outletProps";
import { NavigationLayout } from "../layouts/NavigationLayout";

export const NavigationOutlet = ({ isProtected, reroute }: IOutletProps) => {
  const isAuthenticating = true;

  if (!isAuthenticating && isProtected) {
    return <Navigate to={reroute || "/"} replace />;
  }

  return (
    <NavigationLayout>
      <Outlet />
    </NavigationLayout>
  );
};
