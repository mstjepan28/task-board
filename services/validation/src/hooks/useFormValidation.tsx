import { useMemo, useState } from "react";
import type { z } from "zod";

type TZObj = ReturnType<typeof z.object>;
type TValidationError = { id: string; message: string };

export const useFormValidation = <TSchema extends TZObj>(schema: TSchema) => {
  type TValues = z.infer<TSchema>;
  type TErrorDictionary = Record<keyof TValues, TValidationError>;

  const emptyErrorDict = {} as TErrorDictionary;
  const [errorDict, setErrorDict] = useState<TErrorDictionary>(emptyErrorDict);

  const formId = useMemo(() => {
    return `form-${Date.now()}${Math.random()}`;
  }, []);

  const fieldNames = useMemo(() => {
    type TNames = keyof ReturnType<TSchema["_def"]["shape"]>;
    type TNameRecord = Record<TNames, string>;

    const nameList = Object.keys(schema._def.shape()) as TNames[];

    const nameCollection = nameList.reduce((acc, key: TNames) => {
      acc[key] = key as string;
      return acc;
    }, {} as TNameRecord);

    return nameCollection;
  }, [schema]);

  /*******************************************************/
  /**************** VALIDATION FUNCTIONS *****************/
  /*******************************************************/
  const validateForm = (event: React.FormEvent<HTMLFormElement>) => {
    const values = extractFormValues(event.currentTarget) as TValues;
    const { success, data, error } = schema.safeParse(values);

    const formErrors = error?.issues ? extractErrorMessages(error.issues) : emptyErrorDict;
    setErrorDict(formErrors);

    return {
      data: data as TValues,
      errors: formErrors,
      isValid: success,
    };
  };

  const fieldValidation = (key: keyof TErrorDictionary): TValidationError | void => {
    const formElement = document.querySelector<HTMLFormElement>(`form#${formId}`);
    const values = extractFormValues(formElement) as TValues;

    const fieldValue = { [key]: values[key] };
    const { success, error } = schema.pick(fieldValue).safeParse(fieldValue);

    if (success && !error) {
      removeError(key);
      return;
    }

    const errorList = extractErrorMessages(error.issues);
    setErrorDict((prev) => ({ ...prev, ...errorList }));

    return errorList[key];
  };

  /*******************************************************/
  /***************** HANDLE FORM ERRORS ******************/
  /*******************************************************/
  const getError = (key: keyof TErrorDictionary) => {
    return errorDict[key] || { id: -1, message: "" };
  };

  const setError = (key: keyof TErrorDictionary, message: string) => {
    const newError = createErrorMessage(message);
    const newErrorDict = { ...errorDict, [key]: newError };

    setTimeout(() => setErrorDict(newErrorDict), 0);
  };

  const removeError = (keyList: keyof TErrorDictionary | keyof TErrorDictionary[]) => {
    const errorKeys = Array.isArray(keyList) ? keyList : [keyList];
    const dictKeys = Object.keys(errorDict);

    const emptyDict = {} as TErrorDictionary;

    const newErrorDict = dictKeys.reduce((newDict, key) => {
      if (errorKeys.includes(key)) {
        return newDict;
      }

      const typedKey = key as keyof TValues;
      newDict[typedKey] = errorDict[typedKey];

      return newDict;
    }, emptyDict);

    setTimeout(() => setErrorDict(newErrorDict), 0);
  };

  /*******************************************************/
  /****************** HELPER FUNCTIONS *******************/
  /*******************************************************/

  const createErrorMessage = (message: string) => {
    const id = `${Date.now()}${Math.random()}`;
    return { id, message };
  };

  const extractErrorMessages = (issueList: z.ZodIssue[]) => {
    const initErrors = {} as TErrorDictionary;

    return issueList.reduce<TErrorDictionary>((errorDict, issue) => {
      const fieldName = issue.path[0] as keyof TValues;
      errorDict[fieldName] = createErrorMessage(issue.message);

      return errorDict;
    }, initErrors);
  };

  const extractFormValues = (formElement: HTMLFormElement | null) => {
    if (!formElement) {
      console.error(
        "Form element is undefined, check if the form has the correct id. It should be the same as the formId passed to useForm",
      );
      return {};
    }

    const formData = new FormData(formElement);
    return Object.fromEntries(formData.entries());
  };

  return {
    formId,
    fieldNames,

    removeError,
    setError,
    getError,

    fieldValidation,
    validateForm,
  };
};
