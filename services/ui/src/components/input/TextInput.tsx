import type { IInputProps } from "../../types/inputTypes";
import { FormElementHeader } from "./FormElementHeader";

export const TextInput = (props: IInputProps<HTMLInputElement>) => {
  const steps = props.type === "number" ? "any" : undefined;
  const value = props.value == null ? undefined : String(props.value);
  const defaultValue = props.defaultValue == null ? undefined : String(props.defaultValue);

  return (
    <div className="group/input mb-2 w-full">
      <FormElementHeader isDataValid={!props.error} name={props.name} label={props.label} required={props.required} />

      <input
        id={props.name}
        name={props.name}
        type={props.type}
        step={steps}
        value={value}
        defaultValue={defaultValue}
        readOnly={props.readOnly}
        disabled={props.disabled}
        autoComplete={props.autocomplete}
        placeholder={props.placeholder}
        data-align={props.textPosition}
        data-valid={!props.error}
        onChange={(event) => typeof props.onChange === "function" && props.onChange(event)}
        onFocus={(event) => typeof props.onFocus === "function" && props.onFocus(event)}
        onBlur={(event) => typeof props.onBlur === "function" && props.onBlur(event)}
        className="
          w-full rounded-lg border border-gray-300 bg-gray-50
          px-4 py-3 text-sm leading-4 text-gray-500
          [appearance:textfield]
          read-only:pointer-events-none read-only:opacity-50
          focus:border-primary-600
          focus:ring-primary-600
          focus-visible:outline-primary-600
          disabled:pointer-events-none disabled:opacity-50 
          data-[valid=false]:border-red-600 data-[align=center]:text-center
          data-[align=start]:text-start data-[align=end]:text-end data-[valid=false]:text-red-600
          data-[valid=false]:focus-visible:outline-red-600 
          [&::-webkit-inner-spin-button]:appearance-none 
          [&::-webkit-outer-spin-button]:appearance-none
          "
      />

      {props.error ?? ""}
    </div>
  );
};
