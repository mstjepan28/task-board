import { deepCopy } from "@services/utils";
import { useEffect, useRef, useState } from "react";
import { ActionButton } from "./components/ActionButton";
import { useUndoRedo } from "./hooks/useUndoRedo";
import { generateSudokuGame } from "./utils/generateSudoku";
import { clearGame, loadGame, saveGame } from "./utils/saveLoadGame";
import type { TBoard } from "./types/sudoku";

export const Sudoku = () => {
  const EMPTY_CELL = -1;

  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [selected, setSelected] = useState<number[] | null[]>([null, null]);

  const [board, setBoard] = useState<TBoard>([]);

  const initBoard = useRef<TBoard>([]);
  const gameSolution = useRef<TBoard>([]);

  const { undo, pushMove } = useUndoRedo();

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
      return `bg-blue-300 ${textColor}`;
    }

    const isSelected = checkIfCellSelected(rowIndex, colIndex);
    if (isSelected) {
      return `bg-blue-200 ${textColor}`;
    }

    return `bg-white ${textColor}`;
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

    pushMove({
      x: row,
      y: col,
      old: selectedNumber || EMPTY_CELL,
      new: number,
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

  const handleKeyPress = (key: string | "Backspace") => {
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

  const handleUndoMove = () => {
    const updateBoard = undo(board);
    setBoard(updateBoard);

    saveGame({
      board: updateBoard,
      initBoard: initBoard.current,
      solution: gameSolution.current,
    });
  };

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
      </div>

      <div
        onKeyDownCapture={(event) => handleKeyPress(event.key)}
        className="w-[360px] h-full mx-auto flex flex-col items-center justify-center gap-y-4"
      >
        {/* Sudoku board */}
        <div className=" grid grid-cols-9">
          {board.map((boardRow, rowIndex) => {
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
                        min-w-10 min-h-10 size-10 flex justify-center items-center cursor-pointer select-none 
                        text-xl transition-all duration-150 border border-black shrink-0
                        hover:bg-blue-300 focus:outline-none
                        ${(colIndex + 1) % 3 === 0 && "!border-r-2 border-r-black"}
                        ${(rowIndex + 1) % 3 === 0 && "!border-b-2 border-b-black"}
                        ${rowIndex === 0 && "!border-t-2"}
                        ${colIndex === 0 && "!border-l-2"}
                        ${cellStyle}
                      `}
                >
                  {cell !== EMPTY_CELL && cell}
                </button>
              );
            });
          })}
        </div>

        {/* Number */}
        <div className="w-full flex justify-between">
          {Array.from({ length: 9 }).map((_, index) => {
            return (
              <button
                key={index}
                type="button"
                onClick={() => handleNumberSelect(index + 1)}
                className={`
                    w-8 aspect-square flex justify-center items-center cursor-pointer 
                    select-none text-xl rounded-md border border-gray-600
                    transition-all duration-150 bg-white hover:bg-gray-200
                  `}
              >
                {index + 1}
              </button>
            );
          })}
        </div>

        {/* Action buttons */}
        <div className="w-full flex gap-x-2">
          <button
            type="button"
            onClick={handleUndoMove}
            className="w-full rounded-md bg-white font-semibold uppercase text-sm border px-4 py-1"
          >
            Undo
          </button>
          <button
            type="button"
            onClick={() => handleKeyPress("Backspace")}
            className="w-full rounded-md bg-white font-semibold uppercase text-sm border px-4 py-1"
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};
