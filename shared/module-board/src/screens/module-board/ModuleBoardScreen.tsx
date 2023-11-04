import { usePlates } from "../../hooks/task-hooks/usePlates";

export const ModuleBoardScreen = () => {
  const { parentPlateList, onPlateMove } = usePlates();

  return (
    <div className="min-h-screen-safe flex bg-gray-800">
      {parentPlateList.map((plate) => {
        const bgColor = { backgroundColor: plate.backgroundColor };

        return (
          <div key={plate.id} style={bgColor}>
            {plate.id}
          </div>
        );
      })}
    </div>
  );
};
