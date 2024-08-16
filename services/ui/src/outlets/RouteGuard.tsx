import { Navigate, type TToRoute } from "@services/navigation";
import type { ReactElement } from "react";

interface IProps {
  children: ReactElement;
  condition: boolean;
  redirectPath: TToRoute;
}

export const RouteGuard = ({ children, condition, redirectPath }: IProps) => {
  return condition ? children : <Navigate to={redirectPath} />;
};
