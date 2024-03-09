import { storage } from "@services/storage";
import { deepCopy, useArrayState } from "@services/utils";
import { useEffect } from "react";
import { TBoard } from "../types/sudoku";

type TMove = {
  x: number;
  y: number;
  old: number;
  new: number;
};

const MAX_STACK_SIZE = 20;

export const useUndoRedo = () => {
  const moveStack = useArrayState<TMove>([]);

  const pushMove = (move: TMove) => {
    const newStack = [...moveStack.state, move];
    if (newStack.length + 1 > MAX_STACK_SIZE) {
      newStack.shift();
    }

    storage.setItem("sudoku-move-stack", newStack);
    moveStack.set(newStack);
  };

  const undo = (board: TBoard) => {
    const newMoveStack = [...moveStack.state];
    const lastMove = newMoveStack.pop();
    if (!lastMove) {
      return board;
    }

    const newBoard = deepCopy(board);
    newBoard[lastMove.x][lastMove.y] = lastMove.old;

    storage.setItem("sudoku-move-stack", newMoveStack);
    moveStack.set(newMoveStack);

    return newBoard;
  };

  useEffect(() => {
    const storedStack = storage.getItem<TMove[]>("sudoku-move-stack");
    if (storedStack) {
      moveStack.set(storedStack);
    }
  }, []);

  return { pushMove, undo };
};
