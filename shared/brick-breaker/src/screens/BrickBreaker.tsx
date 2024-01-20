import { useEffect, useRef } from "react";

export const BrickBreaker = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const getContext = () => {
    const canvas = canvasRef.current;

    if (!canvas) {
      throw new Error("Canvas not found");
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

  const draw = (context: CanvasRenderingContext2D) => {
    context.fillStyle = "#fff";

    // get canvas size in px
    const width = context.canvas.width;
    const height = context.canvas.height;

    console.log(width, height);

    // const foo = context.();
    // console.log(foo);

    context.fillRect(0, 0, width, height);
  };

  useEffect(() => {
    const context = getContext();
    draw(context);
  }, []);

  return (
    <canvas ref={canvasRef} className="w-10/12 h-10/12 bg-gray-950 rounded-xl p-4">
      <p>Sorry, your browser does not support canvas.</p>
    </canvas>
  );
};
