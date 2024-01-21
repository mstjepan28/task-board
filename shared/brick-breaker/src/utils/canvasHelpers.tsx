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

  context.imageSmoothingEnabled = false;
  return context;
};

export const getCanvasSize = (context: CanvasRenderingContext2D | null) => {
  if (!context) {
    return {
      width: 0,
      height: 0,
      centerX: 0,
      centerY: 0,
    };
  }

  return {
    width: context.canvas.width,
    height: context.canvas.height,
    centerX: context.canvas.width / 2,
    centerY: context.canvas.height / 2,
  };
};

export const drawBall = (context: CanvasRenderingContext2D, x: number, y: number) => {
  context.beginPath();

  context.arc(x, y, 10, 0, Math.PI * 2);
  context.fillStyle = "#0095DD";
  context.fill();

  context.closePath();
};

export const drawBoard = (context: CanvasRenderingContext2D | null, xOffset: number) => {
  if (!context) {
    return;
  }

  const size = getCanvasSize(context);
  context.imageSmoothingEnabled = false;

  const width = size.width * 0.125;
  const height = size.height * 0.025;

  // init position in the middle of the screen and add offset
  const xPos = size.centerX - width / 2 + xOffset;
  const yPos = size.height - height;

  context.fillStyle = "#fff";
  context.fillRect(xPos, yPos, width, height);
};
