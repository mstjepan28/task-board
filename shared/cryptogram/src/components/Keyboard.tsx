import { useEffect } from "react";

interface IProps {
  onKeyPress: (letter: string) => void;
  onDeletePress: () => void;
}

const DeleteIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z"
      />
    </svg>
  );
};

export const Keyboard = ({ onKeyPress, onDeletePress }: IProps) => {
  const keyboard = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["z", "x", "c", "v", "b", "n", "m"],
  ];

  // --- render keyboard ---

  const renderKey = (letter: string, onPress: () => void) => {
    return (
      <button
        id={letter}
        key={letter}
        type="button"
        onClick={onPress}
        className="
          w-9 h-11 uppercase rounded-lg 
          flex justify-center items-center
          transition-all duration-150 bg-white 
          !outline-none border
          focus:-translate-y-2 focus:scale-125 
          active:bg-gray-100
        "
      >
        {letter}
      </button>
    );
  };

  const renderDeleteKey = () => {
    return (
      <button
        id="backspace"
        type="button"
        onClick={onDeletePress}
        className="
          w-9 h-11 uppercase rounded-lg 
          flex justify-center items-center 
          transition-all duration-150 bg-red-600 
          !outline-none border
          focus:-translate-y-2 focus:scale-125  focus
          active:bg-red-500
        "
      >
        <DeleteIcon />
      </button>
    );
  };

  const renderKeyBoardRow = (row: string[]) => {
    return row.map((letter) => {
      const onPress = () => onKeyPress(letter);
      return renderKey(letter, onPress);
    });
  };

  // --- handle keyboard events ---

  const onKeyDown = (event: KeyboardEvent) => {
    const key = event.key.toLowerCase();

    const isValidLetter = keyboard.flat().includes(key);
    const isBackspace = key === "backspace";

    if (!isValidLetter && !isBackspace) {
      return;
    }

    const element = document.getElementById(key);
    if (!element) {
      return;
    }

    element.focus();
    element.click();

    setTimeout(() => element.blur(), 150);
  };

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="flex flex-col justify-end items-center">
      <div className="flex gap-x-1 mb-1">{renderKeyBoardRow(keyboard[0])}</div>
      <div className="flex gap-x-1 mb-1">{renderKeyBoardRow(keyboard[1])}</div>
      <div className="flex gap-x-1 mb-1">
        {renderKeyBoardRow(keyboard[2])}
        {renderDeleteKey()}
      </div>
    </div>
  );
};
