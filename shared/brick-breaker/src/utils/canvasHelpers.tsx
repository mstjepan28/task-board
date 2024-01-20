import { RefObject } from "react";

export const getContext = (canvasRef: RefObject<HTMLCanvasElement>) => {
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
};

export const getCanvasSize = (context: CanvasRenderingContext2D | null) => {
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
};
