import { useLayoutEffect, useMemo, useRef } from "react";
import { drawBall, drawBoard, getCanvasSize, getContext } from "../utils/canvasHelpers";

const offsets = {
  board: 0,
  ball: {
    x: 0,
    y: 0,
  },
};

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

  const checkBoardCollision = (x: number) => {
    const { width } = getCanvasSize(getContext(canvasRef));
    const boardWidth = width * 0.125;

    if (x + boardWidth > width / 2) {
      return width / 2 - boardWidth;
    }

    if (x < -width / 2) {
      return -width / 2;
    }

    return x;
  };

  const handleKeyPress = (key: string) => {
    const context = getContext(canvasRef);
    if (!context) {
      return;
    }

    const MOVE_BY = 15;

    if (key === "ArrowLeft") {
      const newPosition = offsets.board - MOVE_BY;
      offsets.board = checkBoardCollision(newPosition);
    }

    if (key === "ArrowRight") {
      const newPosition = offsets.board + MOVE_BY;
      offsets.board = checkBoardCollision(newPosition);
    }

    console.log(offsets.board);
  };

  useLayoutEffect(() => {
    const context = getContext(canvasRef);
    if (!context) {
      return;
    }

    const interval = setInterval(() => {
      const size = getCanvasSize(context);
      context.clearRect(0, 0, size.width, size.height);

      drawBall(context, size.centerX, size.centerY);
      drawBoard(context, offsets.board);
    }, 1000 / 60);

    return () => clearInterval(interval);
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
