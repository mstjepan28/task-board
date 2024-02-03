import { Link, LinkOptions } from "@tanstack/react-router";
import { ReactNode } from "react";

type TNavLink = LinkOptions & { children: ReactNode };

export const NavLink = ({ to, children }: TNavLink) => {
  return (
    <Link to={to} className="[&.active]:underline [&.active]:font-medium">
      {children}
    </Link>
  );
};
