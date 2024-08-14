import type { TToRoute } from "@services/navigation";
import type { ReactNode } from "react";
import {
  MdChatBubbleOutline,
  MdOutlineEnhancedEncryption,
  MdOutlineLocationSearching,
  MdOutlineNumbers,
  MdOutlineGridOn,
  MdOutlineTaskAlt,
} from "react-icons/md";

const MENU_ICON_SIZE = 24;

export type TMenuItem = {
  path: TToRoute;
  name: string;
  icon?: ReactNode;
};

export const menuContent: TMenuItem[] = [
  {
    path: "/join-chat",
    name: "Join Chat",
    icon: <MdChatBubbleOutline size={MENU_ICON_SIZE} />,
  },
  {
    path: "/cryptogram",
    name: "Cryptogram",
    icon: <MdOutlineEnhancedEncryption size={MENU_ICON_SIZE} />,
  },
  {
    path: "/path-finder",
    name: "Path Finder",
    icon: <MdOutlineLocationSearching size={MENU_ICON_SIZE} />,
  },
  {
    path: "/number-guess",
    name: "Number Guess",
    icon: <MdOutlineNumbers size={MENU_ICON_SIZE} />,
  },
  {
    path: "/sudoku",
    name: "Sudoku",
    icon: <MdOutlineGridOn size={MENU_ICON_SIZE} />,
  },
  {
    path: "/task-board",
    name: "Task Board",
    icon: <MdOutlineTaskAlt size={MENU_ICON_SIZE} />,
  },
];
