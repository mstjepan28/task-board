import { useState } from "react";

export const useArrayState = <T,>(initialState: T[]) => {
  const [state, setState] = useState(initialState);

  const push = (value: T) => {
    setState((prev) => [...prev, value]);
  };

  const pop = () => {
    setState((prev) => prev.slice(0, -1));
  };

  const remove = (index: number) => {
    setState((prev) => prev.filter((_, i) => i !== index));
  };

  const clear = () => {
    setState([]);
  };

  const set = (newState: T[]) => {
    setState(newState);
  };

  return { state, set, push, remove, pop, clear };
};
