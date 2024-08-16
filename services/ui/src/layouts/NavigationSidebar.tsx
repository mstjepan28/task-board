import { AuthContext } from "@services/auth";
import { useContext, useState } from "react";
import { HiOutlineUser } from "react-icons/hi";
import { MdLogout, MdOutlineMenuOpen } from "react-icons/md";
import { menuContent } from "../data/menuContent";
import { MenuItemButtons, MenuItemLink } from "./menu/MenuItem";

export const NavigationSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { logout, authUser } = useContext(AuthContext);

  const toggleExpanded = () => setIsExpanded((pre) => !pre);

  return (
    <div className="w-fit basis-full px-2 py-2 border-r bg-gray-100 shadow-lg">
      <div className="h-full flex flex-col gap-y-2">
        <MenuItemButtons
          title="Application"
          icon={<MdOutlineMenuOpen size={28} />}
          onClick={toggleExpanded}
          expanded={isExpanded}
        />

        {menuContent.map((menuItem) => {
          return <MenuItemLink key={menuItem.path} menuItem={menuItem} expanded={isExpanded} />;
        })}

        <div className="basis-full" />

        <MenuItemLink
          menuItem={{
            icon: () => <HiOutlineUser size={28} />,
            path: "/",
            name: authUser?.name ?? "Profile",
          }}
          expanded={isExpanded}
        />

        <MenuItemButtons
          title="Logout"
          icon={<MdLogout size={28} />}
          onClick={() => logout.logoutUser()}
          expanded={isExpanded}
        />
      </div>
    </div>
  );
};
