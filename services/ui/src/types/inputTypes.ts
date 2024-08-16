export interface IInputProps<T extends HTMLInputElement | HTMLTextAreaElement> {
  type?: T["type"];

  placeholder?: string;
  label?: string;

  defaultValue?: string;
  value?: string;
  name: string;

  validateOn?: "blue" | "change";
  fieldValidation?: string;
  error?: string;

  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;

  onChange?: (event: React.ChangeEvent<T>) => void;
  onFocus?: (event: React.FocusEvent<T>) => void;
  onBlur?: (event: React.FocusEvent<T>) => void;

  autocomplete?: "off" | "on";
  textPosition?: "start" | "center" | "end";
}
