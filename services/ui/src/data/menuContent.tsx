import type { TToRoute } from "@services/navigation";
import {
  MdChatBubbleOutline,
  MdOutlineAddTask,
  MdOutlineEnhancedEncryption,
  MdOutlineGridOn,
  MdOutlineLocationSearching,
  MdOutlineNumbers,
  MdOutlineTaskAlt,
} from "react-icons/md";

const MENU_ICON_SIZE = 24;

export type TMenuItem = {
  path: TToRoute;
  name: string;
  icon?: (size?: number) => JSX.Element;
};

export const menuContent: TMenuItem[] = [
  {
    path: "/tasks",
    name: "Task List",
    icon: (size) => <MdOutlineTaskAlt size={size ?? MENU_ICON_SIZE} />,
  },
  {
    path: "/tasks",
    name: "Create new task",
    icon: (size) => <MdOutlineAddTask size={size ?? MENU_ICON_SIZE} />,
  },
  {
    path: "/sudoku",
    name: "Sudoku",
    icon: (size) => <MdOutlineGridOn size={size ?? MENU_ICON_SIZE} />,
  },
  {
    path: "/number-guess",
    name: "Number Guess",
    icon: (size) => <MdOutlineNumbers size={size ?? MENU_ICON_SIZE} />,
  },
  {
    path: "/cryptogram",
    name: "Cryptogram",
    icon: (size) => <MdOutlineEnhancedEncryption size={size ?? MENU_ICON_SIZE} />,
  },
  {
    path: "/join-chat",
    name: "Join Chat",
    icon: (size) => <MdChatBubbleOutline size={size ?? MENU_ICON_SIZE} />,
  },
  {
    path: "/path-finder",
    name: "Path Finder",
    icon: (size) => <MdOutlineLocationSearching size={size ?? MENU_ICON_SIZE} />,
  },
];
