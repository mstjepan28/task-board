import { ColorPallet, type TColorPallet } from "../enums/colorPallet";

interface IProps {
  onChange: (color: TColorPallet) => void;
}

export const ColorPicker = ({ onChange }: IProps) => {
  return (
    <div className="">
      <div className="font-semibold pb-1">Color schema: </div>

      <div className="flex gap-x-2">
        {Object.values(ColorPallet).map((schema) => {
          const backgroundColor = schema.split("|")[0];

          return (
            <button
              key={schema}
              type="button"
              style={{ backgroundColor }}
              onClick={() => onChange(schema)}
              className="basis-full max-w-16 min-w-4 aspect-square rounded-lg"
            />
          );
        })}
      </div>
    </div>
  );
};
