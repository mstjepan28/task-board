import type { IOverlayElement } from "@services/ui";
import { BaseModal } from "@services/ui";
import { Difficulty, type TDifficulty } from "../enums/Difficulty";
import { useState } from "react";

interface IProps extends IOverlayElement {
  onSelect: (difficulty: TDifficulty) => void;
}

const difficultyList = [Difficulty.EASY, Difficulty.MEDIUM, Difficulty.HARD, Difficulty.EXPERT];

export const SudokuDifficultySelector = ({ baseRef, onSelect }: IProps) => {
  const [selectedDiff, setSelectedDiff] = useState<TDifficulty | null>(null);

  const onModalOpen = (diff: unknown) => {
    if (typeof diff !== "string") {
      console.warn("passed difficulty is not a string", diff);
      setSelectedDiff(null);
      return;
    }

    const castedDiff = diff as TDifficulty;

    if (!difficultyList.includes(castedDiff)) {
      console.warn("passed difficulty is not a valid difficulty", castedDiff);
      setSelectedDiff(null);
      return;
    }

    setSelectedDiff(castedDiff);
  };

  const onDifficultSelect = (newDifficulty: TDifficulty) => {
    if (selectedDiff === newDifficulty) {
      return;
    }

    setSelectedDiff(newDifficulty);
    onSelect(newDifficulty);

    baseRef.current?.close();
  };

  return (
    <BaseModal ref={baseRef} onOpen={onModalOpen} closeOnOutsideClick>
      <div className="w-full uppercase font-semibold py-2 pb-1 border-b">Select sudoku difficulty: </div>
      <div className="flex flex-col gap-y-3 py-4">
        {difficultyList.map((difficulty) => {
          return (
            <DifficultyOption
              key={difficulty}
              difficulty={difficulty}
              isSelected={selectedDiff === difficulty}
              onClick={() => onDifficultSelect(difficulty)}
            />
          );
        })}
      </div>
    </BaseModal>
  );
};

interface IDifficultyOptionProps {
  difficulty: TDifficulty;
  onClick: (diff: TDifficulty) => void;
  isSelected: boolean;
}

const DifficultyOption = ({ difficulty, onClick, isSelected }: IDifficultyOptionProps) => {
  const bgColor = isSelected ? "bg-blue-500 text-white" : "bg-white text-black";

  return (
    <button
      type="button"
      onClick={() => onClick(difficulty)}
      className={`border rounded-lg px-4 py-2 cursor-pointer ${bgColor}`}
    >
      <span className="uppercase font-semibold text-start">{difficulty}</span>
    </button>
  );
};
