import { alphabetLowercase, alphabetUppercase } from "./alphabet";

export const caesarCipher = (phrase: string, shift: number) => {
  const splitPhrase = phrase.split("");

  const encryptedWord = splitPhrase.map((char) => {
    const lowercaseIndex = alphabetLowercase.indexOf(char);
    if (lowercaseIndex !== -1) {
      const newIndex = (lowercaseIndex + shift) % 26;
      return alphabetLowercase[newIndex];
    }

    const uppercaseIndex = alphabetUppercase.indexOf(char);
    if (uppercaseIndex !== -1) {
      const newIndex = (uppercaseIndex + shift) % 26;
      return alphabetUppercase[newIndex];
    }

    return char;
  });

  return encryptedWord.join("");
};
