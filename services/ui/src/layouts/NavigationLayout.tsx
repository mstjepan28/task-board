import { useResponsive } from "@services/utils";
import { NavigationSidebar } from "./NavigationSidebar";
import { DisplaySize } from "@services/utils";
import { useMemo } from "react";

interface IProps {
  children: React.ReactNode;
}

export const NavigationLayout = ({ children }: IProps) => {
  const isDesktop = useResponsive() >= DisplaySize.TABLET;

  const Layout = useMemo(() => {
    return isDesktop ? NavigationLayoutDesktop : NavigationLayoutMobile;
  }, [isDesktop]);

  return <Layout>{children}</Layout>;
};

const NavigationLayoutMobile = ({ children }: IProps) => {
  return (
    <div className="h-[100dvh] flex">
      <div className="h-full flex flex-col">
        <NavigationSidebar />
      </div>
      <div className="size-full">{children}</div>
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
