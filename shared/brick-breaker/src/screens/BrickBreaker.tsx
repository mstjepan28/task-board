import { useEffect, useRef } from "react";
import { useCanvas } from "../hooks/useCanvas";

export const BrickBreaker = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { context, size } = useCanvas(canvasRef);

  const draw = () => {
    if (!context) {
      return;
    }

    context.fillStyle = "#fff";
    context.fillRect(0, 0, 50, 50);
  };

  useEffect(() => {
    console.log(size);
    draw();
  }, [context]);

  return (
    <canvas ref={canvasRef} className="w-10/12 h-10/12 bg-gray-950 rounded-xl p-4">
      <p>Sorry, your browser does not support canvas.</p>
    </canvas>
  );
};
