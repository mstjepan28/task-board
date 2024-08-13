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

const ICON_SIZE = 24;

export type TMenuItem = {
  path: TToRoute;
  name: string;
  icon?: ReactNode;
};

export const menuContent: TMenuItem[] = [
  {
    path: "/join-chat",
    name: "Join Chat",
    icon: <MdChatBubbleOutline size={ICON_SIZE} />,
  },
  {
    path: "/cryptogram",
    name: "Cryptogram",
    icon: <MdOutlineEnhancedEncryption size={ICON_SIZE} />,
  },
  {
    path: "/path-finder",
    name: "Path Finder",
    icon: <MdOutlineLocationSearching size={ICON_SIZE} />,
  },
  {
    path: "/number-guess",
    name: "Number Guess",
    icon: <MdOutlineNumbers size={ICON_SIZE} />,
  },
  {
    path: "/sudoku",
    name: "Sudoku",
    icon: <MdOutlineGridOn size={ICON_SIZE} />,
  },
  {
    path: "/task-board",
    name: "Task Board",
    icon: <MdOutlineTaskAlt size={ICON_SIZE} />,
  },
];
