import { useMemo } from "react";

interface IProps {
  className?: string;
}

const BoardSquare = ({ className }: IProps) => {
  return <div className={`w-16 aspect-square flex justify-center items-center ${className}`}>1</div>;
};

export const ChessScreen = () => {
  const board = useMemo(() => {
    const board = [];

    for (let i = 0; i < 8; i++) {
      const row = [];
      for (let j = 0; j < 8; j++) {
        const bgColor = (i + j) % 2 === 1 ? "bg-gray-900" : "bg-gray-50";
        const square = <BoardSquare key={`${i}-${j}`} className={bgColor} />;

        row.push(square);
      }
      board.push(row);
    }

    return board;
  }, []);

  return (
    <div className="h-full flex justify-center items-center">
      <div className="w-fit grid grid-cols-8 border-white border-2">{board}</div>
    </div>
  );
};
