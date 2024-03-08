import { deepCopy } from "@services/utils";
import { useEffect, useRef, useState } from "react";
import { ActionButton } from "./components/ActionButton";
import { useUndoRedo } from "./hooks/useUndoRedo";
import { TBoard } from "./types/sudoku";
import { generateSudokuGame } from "./utils/generateSudoku";
import { clearGame, loadGame, saveGame } from "./utils/saveLoadGame";

export const Sudoku = () => {
  const EMPTY_CELL = -1;

  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [selected, setSelected] = useState<number[] | null[]>([null, null]);

  const [board, setBoard] = useState<TBoard>([]);

  const initBoard = useRef<TBoard>([]);
  const gameSolution = useRef<TBoard>([]);

  // --- check if number placement is valid ---
  const checkIfNumberIsValid = (row: number, col: number, number: number) => {
    return (
      checkIfRowIsValid(row, col, number) &&
      checkIfColIsValid(row, col, number) &&
      checkIfSectionIsValid(row, col, number)
    );
  };

  const checkIfRowIsValid = (row: number, col: number, number: number) => {
    return !board[row].some((cell, index) => {
      if (index === col) {
        return false;
      }
      return cell === number;
    });
  };

  const checkIfColIsValid = (row: number, col: number, number: number) => {
    return !board.some((curRow, index) => {
      if (index === row) {
        return false;
      }
      return curRow[col] === number;
    });
  };

  const checkIfSectionIsValid = (row: number, col: number, number: number) => {
    const rowStart = Math.floor(row / 3) * 3;
    const colStart = Math.floor(col / 3) * 3;

    for (let i = rowStart; i < rowStart + 3; i++) {
      for (let j = colStart; j < colStart + 3; j++) {
        if (i === row && j === col) {
          continue;
        }

        if (board[i][j] === number) {
          return false;
        }
      }
    }

    return true;
  };

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

  // --- render board ---

  const getCellStyle = (rowIndex: number, colIndex: number, value: number) => {
    if (value === EMPTY_CELL) {
      return "bg-white";
    }

    const getTextColor = () => {
      const isDefaultCell = initBoard.current[rowIndex][colIndex] !== EMPTY_CELL;
      if (isDefaultCell) {
        return "text-blue-700";
      }

      const isNumberIsValid = checkIfNumberIsValid(rowIndex, colIndex, value);
      if (!isNumberIsValid) {
        return "text-red-600";
      }

      return "text-gray-950";
    };

    const textColor = getTextColor();

    const isSameValueSelected = selectedNumber !== EMPTY_CELL && value === selectedNumber;
    if (isSameValueSelected) {
      return `font-semibold bg-blue-100 ${textColor}`;
    }

    const isSelectedCell = isPrimarySelect(rowIndex, colIndex);
    if (isSelectedCell) {
      return `bg-gray-100 ${textColor}`;
    }

    const isSelected = checkIfCellSelected(rowIndex, colIndex);
    if (isSelected) {
      return `bg-blue-50 ${textColor}`;
    }

    return `bg-white ${textColor}`;
  };

  const renderBoardRow = (boardRow: number[], rowIndex: number) => {
    return boardRow.map((cell, colIndex) => {
      const key = `${rowIndex}-${colIndex}`;
      const selectCell = () => {
        setSelected([rowIndex, colIndex]);
        setSelectedNumber(cell);
      };

      const cellStyle = getCellStyle(rowIndex, colIndex, cell);

      return (
        <button
          key={key}
          type="button"
          onClick={selectCell}
          className={`
            w-8 h-8 flex justify-center items-center 
            cursor-pointer select-none text-xl
            border-r border-b border-gray-600 transition-all duration-150
            hover:bg-gray-200 focus:outline-none
            ${(colIndex + 1) % 3 === 0 && "!border-r-2 border-r-black"}
            ${(rowIndex + 1) % 3 === 0 && "!border-b-2 border-b-black"}
            ${cellStyle}
          `}
        >
          {cell !== EMPTY_CELL && cell}
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

    if (initBoard.current[row][col] !== EMPTY_CELL) {
      return;
    }

    const boardCopy = [...board];
    boardCopy[row][col] = number;

    setSelectedNumber(number);
    setBoard(boardCopy);

    const gameFinished = checkForWin();

    if (gameFinished) {
      alert("You won!");
      clearCurrentGame();
    }

    saveGame({
      board: boardCopy,
      initBoard: initBoard.current,
      solution: gameSolution.current,
    });
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
    const [row, col] = [...selected];

    if (row === null || col === null) {
      return;
    }

    const newRow = row + rowChange;
    const newCol = col + colChange;

    if (newRow < 0 || newRow > 8 || newCol < 0 || newCol > 8) {
      return;
    }

    setSelected([newRow, newCol]);
  };

  const handleKeyPress = (key: string) => {
    const isNumber = !Number.isNaN(Number(key));
    if (isNumber) {
      handleNumberSelect(Number(key));
      return;
    }
    if (key === "Backspace") {
      handleNumberSelect(EMPTY_CELL);
      return;
    }

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

  const createNewGame = () => {
    const generatedGame = generateSudokuGame("easy");

    setBoard(generatedGame.puzzle);
    gameSolution.current = generatedGame.solution;
    initBoard.current = deepCopy(generatedGame.puzzle);

    saveGame({
      board: generatedGame.puzzle,
      initBoard: initBoard.current,
      solution: gameSolution.current,
    });
  };

  const checkForWin = () => {
    const flatBoard = board.flat();
    const flatSolution = gameSolution.current.flat();

    return flatBoard.every((cell, index) => cell === flatSolution[index]);
  };

  const resetGame = () => {
    const initBoardState = deepCopy(initBoard.current);

    setBoard(initBoardState);

    saveGame({
      board: initBoardState,
      initBoard: initBoardState,
      solution: gameSolution.current,
    });
  };

  const clearCurrentGame = () => {
    clearGame();
    createNewGame();
  };

  const { undo } = useUndoRedo();

  useEffect(() => {
    const loadedGame = loadGame();
    if (!loadedGame) {
      createNewGame();
      return;
    }

    setBoard(loadedGame.board);
    initBoard.current = loadedGame.initBoard;
    gameSolution.current = loadedGame.solution;
  }, []);

  return (
    <>
      <div className="items-end absolute top-0 right-0 py-2 px-4 flex flex-col gap-y-1">
        <ActionButton label="Clear game" onClick={resetGame} />
        <ActionButton label="Undo" onClick={() => undo(board, setBoard)} />
      </div>

      <div
        onKeyDownCapture={(event) => handleKeyPress(event.key)}
        className="w-full h-full flex flex-col justify-center items-center gap-y-4"
      >
        <div className="rounded-lg p-4 bg-gray-300">
          <div className="grid grid-cols-9 border-t-2 border-l-2 border-gray-900 bg-white">{renderBoard()}</div>
        </div>

        <div className="rounded-lg px-4 py-3 bg-gray-300">
          <div className="grid grid-cols-9 gap-x-1">{renderNumbers()}</div>
        </div>
      </div>
    </>
  );
};
