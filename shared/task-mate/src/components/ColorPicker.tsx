import { useState } from "react";
import { ColorPallet, type TColorPallet } from "../enums/colorPallet";

interface IProps {
  name: string;
  value: TColorPallet;
  onChange: (color: TColorPallet) => void;
}

export const ColorPicker = ({ name, value, onChange }: IProps) => {
  const [selectedSchema, setSelectedSchema] = useState<TColorPallet>(value);

  const onColorClick = (color: TColorPallet) => {
    setSelectedSchema(color);
    onChange(color);
  };

  return (
    <div>
      <input id={name} name={name} type="text" value={selectedSchema} onChange={() => {}} className="sr-only" />

      <div className="font-medium pb-1">Color schema: </div>

      <div className="flex gap-x-2">
        {Object.values(ColorPallet).map((schema) => {
          const backgroundColor = schema.split("|")[0];

          return (
            <button
              key={schema}
              type="button"
              style={{ backgroundColor }}
              onClick={() => onColorClick(schema)}
              className="basis-full max-w-16 min-w-4 aspect-square rounded-lg"
            />
          );
        })}
      </div>
    </div>
  );
};
