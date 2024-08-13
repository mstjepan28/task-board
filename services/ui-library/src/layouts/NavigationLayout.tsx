import { NavigationSidebar } from "./NavigationSidebar";

interface IProps {
  children: React.ReactNode;
}

export const NavigationLayout = ({ children }: IProps) => {
  return (
    <div className="h-[100dvh] flex">
      <div className="h-full flex flex-col">
        <NavigationSidebar />
      </div>
      <div className="size-full">{children}</div>
    </div>
  );
};
