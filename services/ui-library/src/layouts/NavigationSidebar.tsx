import { Link } from "@services/navigation";
import { menuContent, type TMenuItem } from "../data/menuContent";
import { useState } from "react";

export const NavigationSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => setIsExpanded((pre) => !pre);

  return (
    <div className="w-fit basis-full px-2 py-1 border-r bg-gray-100 shadow-lg">
      <div className="flex flex-col gap-y-2">
        <button
          type="button"
          onClick={toggleExpanded}
          className="w-full uppercase text-start font-extrabold px-4 pt-2 pb-1 mb-1 border-b"
        >
          App
        </button>

        {menuContent.map((menuItem) => {
          return <MenuItem key={menuItem.path} menuItem={menuItem} expanded={isExpanded} />;
        })}
      </div>
    </div>
  );
};

interface IMenuItemProps {
  menuItem: TMenuItem;
  expanded: boolean;
}

const MenuItem = ({ menuItem, expanded }: IMenuItemProps) => {
  const bgColor = menuItem.path === window.location.pathname ? "bg-gray-200" : "";
  const textSize = expanded ? "max-w-[250px]" : "max-w-[0px]";

  return (
    <Link to={menuItem.path} className={`w-full px-4 py-2 flex items-center rounded-lg ${bgColor}`}>
      {menuItem.icon ?? <div className="size-4" />}

      <div
        className={`flex uppercase font-medium overflow-hidden whitespace-nowrap duration-300 transition-all ${textSize}`}
      >
        <div className="shrink-0 size-4" />
        {menuItem.name}
      </div>
    </Link>
  );
};
