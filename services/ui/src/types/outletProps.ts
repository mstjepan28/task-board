import type { TToRoute } from "@services/navigation";

export interface IOutletProps {
  isProtected?: boolean;
  reroute?: TToRoute;
}
