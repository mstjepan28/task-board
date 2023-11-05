import { useEffect, useState } from "react";

export const Sudoku = () => {
  const [board, setBoard] = useState<number[][]>([]);
  const [selected, setSelected] = useState<number[] | null[]>([null, null]);

  // --- check if cell selected ---

  const checkIfSectionSelected = (cellRow: number, cellCol: number) => {
    const [selectedRow, selectedCol] = selected;
    if (selectedRow === null || selectedCol === null) {
      return false;
    }

    const rowStart = Math.floor(selectedRow / 3) * 3;
    const rowEnd = rowStart + 3;

    const colStart = Math.floor(selectedCol / 3) * 3;
    const colEnd = colStart + 3;

    return cellRow >= rowStart && cellRow < rowEnd && cellCol >= colStart && cellCol < colEnd;
  };

  const checkIfRowSelected = (cellRow: number) => {
    if (selected[0] === null) {
      return false;
    }

    return cellRow === selected[0];
  };

  const checkIfColSelected = (cellCol: number) => {
    if (selected[1] === null) {
      return false;
    }

    return cellCol === selected[1];
  };

  const checkIfCellSelected = (cellRow: number, cellCol: number) => {
    return checkIfRowSelected(cellRow) || checkIfColSelected(cellCol) || checkIfSectionSelected(cellRow, cellCol);
  };

  const isPrimarySelect = (cellRow: number, cellCol: number) => {
    if (!selected) {
      return false;
    }

    return cellRow === selected[0] && cellCol === selected[1];
  };

  // --- generate board ---

  const generateBoard = () => {
    const newBoard = Array.from({ length: 9 }).map(() => {
      return Array.from({ length: 9 }, () => -1);
    });
    setBoard(newBoard);
  };

  // --- render board ---

  const renderBoardRow = (boardRow: number[], rowIndex: number) => {
    return boardRow.map((cell, colIndex) => {
      const key = `${rowIndex}-${colIndex}`;
      const selectCell = () => setSelected([rowIndex, colIndex]);

      const isSelectedCell = isPrimarySelect(rowIndex, colIndex);
      const isSelected = checkIfCellSelected(rowIndex, colIndex);

      return (
        <button
          key={key}
          type="button"
          onClick={selectCell}
          className={`
            w-8 h-8 flex justify-center items-center 
            cursor-pointer select-none text-xl
            border-r border-b border-gray-600 transition-all duration-150
            hover:bg-gray-200
            focus:outline-none
            ${(colIndex + 1) % 3 === 0 && "!border-r-2 border-r-black"}
            ${(rowIndex + 1) % 3 === 0 && "!border-b-2 border-b-black"}
            ${isSelectedCell && "!bg-gray-100"}
            ${isSelected ? "bg-gray-300" : "bg-white/10"}
          `}
        >
          {cell !== -1 && cell}
        </button>
      );
    });
  };

  const renderBoard = () => {
    return board.map((row, index) => renderBoardRow(row, index));
  };

  // --- handle number select ---

  const handleNumberSelect = (number: number) => {
    const [row, col] = selected;
    if (row === null || col === null) {
      return;
    }

    const boardCopy = [...board];
    boardCopy[row][col] = number;

    setBoard(boardCopy);
  };

  const renderNumbers = () => {
    return Array.from({ length: 9 }).map((_, index) => {
      return (
        <button
          key={index}
          type="button"
          onClick={() => handleNumberSelect(index + 1)}
          className={`
          w-8 h-8 flex justify-center items-center
          cursor-pointer select-none text-xl
          rounded-lg border border-gray-600 transition-all duration-150
          bg-white hover:bg-gray-200
          `}
        >
          {index + 1}
        </button>
      );
    });
  };

  // --- handle key press ---

  const handleArrowPress = (rowChange: number, colChange: number) => {
    setSelected((cur) => {
      if (cur[0] === null || cur[1] === null) {
        return cur;
      }

      const newRow = cur[0] + rowChange;
      const newCol = cur[1] + colChange;

      if (newRow < 0 || newRow > 8 || newCol < 0 || newCol > 8) {
        return cur;
      }

      return [newRow, newCol];
    });
  };

  const handleKeyPress = (key: string) => {
    switch (key) {
      case "ArrowUp":
        handleArrowPress(-1, 0);
        break;
      case "ArrowDown":
        handleArrowPress(1, 0);
        break;
      case "ArrowLeft":
        handleArrowPress(0, -1);
        break;
      case "ArrowRight":
        handleArrowPress(0, 1);
        break;
    }
  };

  // --- ui ---

  useEffect(() => {
    generateBoard();
    document.addEventListener("keydown", ({ key }) => handleKeyPress(key));
  }, []);

  return (
    <div className="w-full flex flex-col justify-center items-center gap-y-4">
      <div className="rounded-lg p-4 bg-gray-300">
        <div className="grid grid-cols-9 border-t-2 border-l-2 border-gray-900 bg-white">{renderBoard()}</div>
      </div>
      <div className="rounded-lg px-4 py-3 bg-gray-300">
        <div className="grid grid-cols-9 gap-x-1">{renderNumbers()}</div>
      </div>
    </div>
  );
};
