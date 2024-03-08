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
    if (moveStack.state.length > MAX_STACK_SIZE) {
      const newStack = [...moveStack.state, move];
      newStack.shift();

      moveStack.set(newStack);
      return;
    }

    moveStack.push(move);
  };

  const undo = (board: TBoard, setBoard: (newBoard: TBoard) => void) => {
    const lastMove = moveStack.pop();
    if (!lastMove) {
      return;
    }

    const newBoard = deepCopy(board);
    newBoard[lastMove.x][lastMove.y] = lastMove.old;

    setBoard(newBoard);
  };

  useEffect(() => {
    const storedStack = storage.getItem<TMove[]>("sudoku-move-stack");
    if (storedStack) {
      moveStack.set(storedStack);
    }
  }, []);

  return { pushMove, undo };
};
