import { useDragPlate } from "../../hooks/useDragPlate";
import { TPlate } from "../../types/plate";

interface IProps {
  plate: TPlate;
}

export const TaskCard = ({ plate }: IProps) => {
  const plateId = `plate-${plate.id}`;
  useDragPlate(plateId, plate);

  return (
    <div
      id={plateId}
      draggable
      style={{ backgroundColor: plate.backgroundColor }}
      className="py-4 flex justify-center items-center  w-full cursor-move p-1 rounded-lg border border-gray-100"
    ></div>
  );
};
