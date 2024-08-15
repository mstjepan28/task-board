import { useRef, useState } from "react";
import { Keyboard } from "./components/Keyboard";
import { WinModal } from "./components/WinModal";
import { caesarCipher } from "./encryption/caesarCipher";
import { useQuote } from "./hooks/useQuote";

type TPuzzle = Record<string, string>;
const CIPHER_OFFSET = Math.floor(Math.random() * 25) + 1;

export const Cryptogram = () => {
  const [reveledLetters, setReveledLetters] = useState<TPuzzle>({});
  const [selectedLetter, setSelectedLetter] = useState<string>("");

  const winModalRef = useRef(null) as any;

  const { quote, author, encryptedQuote, solution, nextRound } = useQuote(CIPHER_OFFSET);

  // --- render quote ---

  const getLetterIfReveled = (encryptedLetter: string) => {
    const connectedLetter = reveledLetters[encryptedLetter];
    return connectedLetter ? connectedLetter : <div className="w-6 h-6"></div>;
  };

  const renderQuote = () => {
    const splitQuote = quote.split(" ");

    return splitQuote.map((word, index) => {
      const letterList = word.split("");

      const renderedWord = letterList.map((letter, index) => {
        const isLetter = !!letter.toLowerCase().match(/[a-z]/i);
        const encryptedLetter = caesarCipher(letter, CIPHER_OFFSET);
        const isSelected = selectedLetter === encryptedLetter;

        if (!isLetter) {
          return (
            <div key={index} className="w-6  text-center">
              {letter}
            </div>
          );
        }

        return (
          <button key={index} type="button" className="" onClick={() => setSelectedLetter(encryptedLetter)}>
            <div data-selected={isSelected} className="w-6 text-center data-[selected=true]:bg-white/10">
              {getLetterIfReveled(encryptedLetter)}
            </div>
            <div className="w-6 select-none text-center border-t">{encryptedLetter}</div>
          </button>
        );
      });

      return (
        <div key={index} className="flex items-center gap-x-1">
          {renderedWord}
        </div>
      );
    });
  };

  // --- handle letter reveal ---

  const revealLetter = (letter: string) => {
    const letterSet = { ...reveledLetters, [selectedLetter]: letter };
    setReveledLetters(letterSet);

    const win = Object.keys(solution).every((key) => solution[key] === letterSet[key]);
    if (win) {
      winModalRef.current.open();
    }

    const nextSelected = encryptedQuote[encryptedQuote.indexOf(selectedLetter) + 1];
    setSelectedLetter(nextSelected);
  };

  const deleteLetter = () => {
    const { [selectedLetter]: _, ...rest } = reveledLetters;
    const remaining = Object.keys(rest);

    const newSelectedLetter = remaining[remaining.length - 1];
    setSelectedLetter(newSelectedLetter);

    setReveledLetters(rest);
  };

  // --- handle round change ---

  const onNextRound = () => {
    nextRound();
    resetBoard();
  };

  const resetBoard = () => {
    setReveledLetters({});
    setSelectedLetter("");
  };

  return (
    <>
      <WinModal ref={winModalRef} nextRound={onNextRound} />

      <div className="w-full flex flex-col justify-between items-center p-4">
        <div className="flex flex-col">
          <div className="flex flex-wrap gap-x-4 gap-y-2">{renderQuote()}</div>
          <div className="italic text-end  mt-2">{author}</div>
        </div>

        <Keyboard onKeyPress={revealLetter} onDeletePress={deleteLetter} />
      </div>
    </>
  );
};
