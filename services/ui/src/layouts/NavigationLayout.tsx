import { DisplaySize, useResponsive } from "@services/utils";
import { useMemo } from "react";
import { MobileNavigation } from "./menu/MobileNavigation";
import { NavigationSidebar } from "./NavigationSidebar";

interface IProps {
  children: React.ReactNode;
}

export const NavigationLayout = ({ children }: IProps) => {
  const isDesktop = useResponsive() >= DisplaySize.TABLET;

  const Layout = useMemo(() => {
    if (isDesktop) {
      return NavigationLayoutDesktop;
    }

    return NavigationLayoutMobile;
  }, [isDesktop]);

  return <Layout>{children}</Layout>;
};

const NavigationLayoutMobile = ({ children }: IProps) => {
  return (
    <div className="h-[100dvh] overflow-hidden flex flex-col">
      {/* Main view */}
      <div className="basis-full">
        <div className="h-full">{children}</div>
      </div>

      {/* Menu */}
      <MobileNavigation />
    </div>
  );
};

const NavigationLayoutDesktop = ({ children }: IProps) => {
  return (
    <div className="h-[100dvh] flex">
      <div className="h-full flex flex-col">
        <NavigationSidebar />
      </div>
      <div className="size-full">{children}</div>
    </div>
  );
};
