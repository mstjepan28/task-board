import { useMemo, useState } from "react";
import { quoteList } from "../quotes/quoteList";
import { caesarCipher } from "../encryption/caesarCipher";
import { storage } from "@shared/storage";

type TPuzzle = Record<string, string>;

export const useQuote = (cipherOffset: number) => {
  const initialRound = storage.getItem("cryptogram-round-key") || 0;
  const [round, setRound] = useState(initialRound);

  const { quote, author, encryptedQuote, solution } = useMemo(() => {
    const selectedQuote = quoteList[round];

    const quote = selectedQuote.quote.toLowerCase();
    const author = selectedQuote.author;

    const solution = quote.split("").reduce((acc, letter) => {
      if (!letter.match(/[a-z]/i)) {
        return acc;
      }

      const encrypted = caesarCipher(letter, cipherOffset);
      return { ...acc, [encrypted]: letter };
    }, {}) as TPuzzle;

    const encryptedQuote = quote.split("").map((letter) => caesarCipher(letter, cipherOffset));

    return {
      quote,
      author,
      encryptedQuote,
      solution,
    };
  }, [round]);

  const nextRound = () => {
    const nextRound = round + 1;

    storage.setItem("cryptogram-round-key", nextRound);
    setRound(nextRound);
  };

  return { quote, author, encryptedQuote, solution, nextRound };
};
