import { storage } from "@services/storage";
import type { TSaveGame } from "../types/sudoku";

export const saveGame = (game: TSaveGame) => {
  storage.setItem("sudoku-game", game);
};

export const loadGame = () => {
  return storage.getItem<TSaveGame>("sudoku-game");
};

export const clearGame = () => {
  storage.removeItem("sudoku-game");
};
