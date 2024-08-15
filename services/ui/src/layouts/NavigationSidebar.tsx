import { useState } from "react";
import { MdOutlineMenuOpen } from "react-icons/md";
import { menuContent } from "../data/menuContent";
import { MenuItem } from "./menu/MenuItem";

export const NavigationSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => setIsExpanded((pre) => !pre);

  return (
    <div className="w-fit basis-full px-2 py-1 border-r bg-gray-100 shadow-lg">
      <div className="flex flex-col gap-y-2">
        <button
          type="button"
          onClick={toggleExpanded}
          className="w-full flex uppercase text-start font-semibold px-3 pr-4 py-2 mb-2 border-b-2"
        >
          <div className={`transition-all duration-300 ${isExpanded ? "" : "rotate-180"}`}>
            <MdOutlineMenuOpen size={28} />
          </div>

          <span
            className={`flex uppercase font-extrabold overflow-hidden whitespace-nowrap duration-300 transition-all ${isExpanded ? "max-w-[250px]" : "max-w-[0px]"}`}
          >
            <div className="shrink-0 size-4" />
            Application
          </span>
        </button>

        {menuContent.map((menuItem) => {
          return <MenuItem key={menuItem.path} menuItem={menuItem} expanded={isExpanded} />;
        })}
      </div>
    </div>
  );
};
