import { storage } from "@services/storage";
import { useArrayState } from "@services/utils";
import { useEffect } from "react";

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
    }
    moveStack.push(move);
  };

  useEffect(() => {
    const storedStack = storage.getItem<TMove[]>("sudoku-move-stack");
    if (storedStack) {
      moveStack.set(storedStack);
    }
  }, []);

  return { pushMove };
};
