import { RefObject, useMemo } from "react";

export const useCanvas = (canvasRef: RefObject<HTMLCanvasElement>) => {
  const context = useMemo(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return null;
    }

    if (!canvas.getContext) {
      throw new Error("Canvas context not found");
    }

    const context = canvas.getContext("2d");
    if (!context) {
      throw new Error("Canvas context not found");
    }

    return context;
  }, [canvasRef.current]);

  const size = useMemo(() => {
    if (!context) {
      return {
        width: 0,
        height: 0,
      };
    }

    return {
      width: context.canvas.width,
      height: context.canvas.height,
    };
  }, [context]);

  return { context, size };
};
