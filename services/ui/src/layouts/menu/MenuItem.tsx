import { Link } from "@services/navigation";
import type { TMenuItem } from "../../data/menuContent";

interface IMenuItemLinkProps {
  menuItem: TMenuItem;
  expanded: boolean;
}

export const MenuItemLink = ({ menuItem, expanded }: IMenuItemLinkProps) => {
  const bgColor = menuItem.path === window.location.pathname ? "bg-gray-200" : "";
  const textSize = expanded ? "max-w-[250px]" : "max-w-[0px]";

  return (
    <Link to={menuItem.path} className={`w-full px-4 py-4 flex items-center rounded-lg md:py-2 border ${bgColor}`}>
      {menuItem.icon ? menuItem.icon() : <div className="size-4" />}

      <span
        className={`flex uppercase font-medium overflow-hidden whitespace-nowrap duration-300 transition-all ${textSize}`}
      >
        <div className="shrink-0 size-4" />
        {menuItem.name}
      </span>
    </Link>
  );
};

interface MenuItemButtons {
  title: string;
  icon: React.ReactNode;
  onClick: () => void;
  expanded: boolean;
}

export const MenuItemButtons = ({ title, icon, onClick, expanded }: MenuItemButtons) => {
  const textSize = expanded ? "max-w-[250px]" : "max-w-[0px]";

  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full px-4 py-4 flex items-center rounded-lg md:py-2 border cursor-pointer"
    >
      {icon ?? <div className="size-4" />}

      <span
        className={`flex uppercase font-medium overflow-hidden whitespace-nowrap duration-300 transition-all ${textSize}`}
      >
        <div className="shrink-0 size-4" />
        {title}
      </span>
    </button>
  );
};
