import { useLayoutEffect, useMemo, useRef } from "react";
import { drawBall, drawBoard, getCanvasSize, getContext } from "../utils/canvasHelpers";

export const BrickBreaker = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const canvasSize = useMemo(() => {
    const { innerHeight, innerWidth } = window;
    return {
      width: innerWidth * 0.8,
      height: innerHeight * 0.8,
    };
  }, []);

  // --- Handle drawing the bounce board ---

  const handleKeyPress = (key: string) => {
    const context = getContext(canvasRef);
    if (!context) {
      return;
    }

    const MOVE_BY = 1;

    switch (key) {
      case "ArrowLeft":
        drawBoard(context, -MOVE_BY);
        break;
      case "ArrowRight":
        drawBoard(context, MOVE_BY);
        break;
      default:
        break;
    }
  };

  // --- Main draw loop ---

  const mainDrawLoop = (context: CanvasRenderingContext2D | null) => {
    if (!context) {
      return;
    }

    const size = getCanvasSize(context);
    context.clearRect(0, 0, size.width, size.height);

    drawBall(context, size.centerX, size.centerY);
    drawBoard(context, 0);
  };

  useLayoutEffect(() => {
    const context = getContext(canvasRef);
    setInterval(() => mainDrawLoop(context), 1000);
  }, []);

  return (
    <canvas
      tabIndex={0}
      ref={canvasRef}
      onKeyDownCapture={(event) => handleKeyPress(event.key)}
      width={canvasSize.width}
      height={canvasSize.height}
      className="bg-gray-950 rounded-xl p-4 focus:outline-none"
    >
      <p>Sorry, your browser does not support canvas.</p>
    </canvas>
  );
};
