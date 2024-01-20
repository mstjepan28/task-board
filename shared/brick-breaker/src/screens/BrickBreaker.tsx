import { useLayoutEffect, useRef } from "react";
import { getCanvasSize, getContext } from "../utils/canvasHelpers";

export const BrickBreaker = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const draw = (context: CanvasRenderingContext2D | null) => {
    if (!context) {
      return;
    }

    const size = getCanvasSize(context);

    const width = size.width * 0.1;
    const height = size.height * 0.1;

    const xPos = size.width * 0.5 - 25;
    const yPos = size.height - height;

    console.log(xPos, yPos, width, height);

    context.fillStyle = "#fff";
    context.fillRect(xPos, yPos, width, height);
  };

  useLayoutEffect(() => {
    const context = getContext(canvasRef);
    draw(context);
  }, []);

  return (
    <canvas ref={canvasRef} className="w-10/12 h-10/12 bg-gray-950 rounded-xl p-4">
      <p>Sorry, your browser does not support canvas.</p>
    </canvas>
  );
};
