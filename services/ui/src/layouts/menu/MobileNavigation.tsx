import { Link } from "@services/navigation";
import { useRef } from "react";
import { MdMoreVert } from "react-icons/md";
import { BaseModal } from "../../components/overlays/BaseModal";
import { menuContent, type TMenuItem } from "../../data/menuContent";
import type { TOverlayRef } from "../../types/overlay";
import { MenuItem } from "./MenuItem";

const ICON_SIZE = 28;

export const MobileNavigation = () => {
  const menuRef = useRef(null) as TOverlayRef;

  return (
    <div className="relative">
      <div className="flex justify-evenly items-center px-2 py-2 border-t">
        <BottomMenuLink menuItem={menuContent[0]} />
        <BottomMenuLink menuItem={menuContent[3]} />
        <BottomMenuLink menuItem={menuContent[4]} />
        <BottomMenuLink menuItem={menuContent[5]} />

        <BottomMenuButton icon={<MdMoreVert size={ICON_SIZE} />} onClick={() => menuRef.current?.open()} />
      </div>

      <BaseModal ref={menuRef} closeOnOutsideClick>
        <div className="flex flex-col gap-y-2 py-4">
          {menuContent.map((menuItem) => {
            return <MenuItem key={menuItem.path} menuItem={menuItem} expanded />;
          })}
        </div>
      </BaseModal>
    </div>
  );
};

const BottomMenuLink = ({ menuItem }: { menuItem: TMenuItem }) => {
  const bgColor = menuItem.path === window.location.pathname ? "bg-gray-200" : "";

  const fallbackElement = <div style={{ width: ICON_SIZE, height: ICON_SIZE }} />;
  const icon = menuItem.icon ? menuItem.icon(ICON_SIZE) : fallbackElement;

  return (
    <Link to={menuItem.path} className={`border p-2 rounded-lg ${bgColor}`}>
      {icon}
    </Link>
  );
};

interface IBottomMenuButton {
  icon: React.ReactNode;
  onClick: () => void;
  isSelected?: boolean;
}

const BottomMenuButton = ({ icon, onClick, isSelected }: IBottomMenuButton) => {
  const bgColor = isSelected ? "bg-gray-200" : "";

  return (
    <button type="button" onClick={onClick} className={`border p-2 rounded-lg ${bgColor}`}>
      {icon}
    </button>
  );
};
