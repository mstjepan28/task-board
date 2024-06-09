export const INPUT_LENGTH = 4;
export const VALID_NUMBERS = "0123456789";

export const generateInputArray = () => {
  if (INPUT_LENGTH < 1) {
    return Array.from({ length: 1 }, () => "");
  }
  if (INPUT_LENGTH > VALID_NUMBERS.length) {
    return Array.from({ length: 10 }, () => "");
  }

  return Array.from({ length: INPUT_LENGTH }, () => "");
};

export const generateRandomNumber = () => {
  let randNumber = "";
  let numbers = VALID_NUMBERS;

  for (let i = 0; i < INPUT_LENGTH; i++) {
    const index = Math.floor(Math.random() * numbers.length);
    const number = numbers[index];

    numbers = numbers.replace(number, "");
    randNumber += number;
  }

  return randNumber;
};
