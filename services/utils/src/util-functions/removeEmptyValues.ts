type TObject = Record<string, any>;

const checkIfEmpty = (value: any, keepEmptyStrings: boolean) => {
  const isNullish = value === undefined || value === null;

  if (keepEmptyStrings) {
    return !isNullish;
  }

  return !isNullish && value !== "";
};

export const removeEmptyValues = (object: TObject, keepEmptyStrings = true) => {
  const newObject: TObject = {};

  Object.entries(object).forEach(([key, value]) => {
    const isNotEmpty = checkIfEmpty(value, keepEmptyStrings);

    if (isNotEmpty) {
      newObject[key] = value;
    }
  });

  return newObject;
};
