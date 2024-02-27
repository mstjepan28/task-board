import { debounce, throttle } from "@services/utils";
import { useRef } from "react";

export const DeleteButton = () => {
  const deleteZoneRef = useRef<HTMLDivElement>(null);

  const handleDragOver = throttle(250, () => {
    deleteZoneRef.current?.classList.remove("w-0");
    deleteZoneRef.current?.classList.add("w-36");

    debounce(1000, () => {
      console.log("deleting");
    });
  });

  // const onDragOverDeleteZone = () => {
  //   deleteZoneRef.current?.classList.add("w-0");
  //   deleteZoneRef.current?.classList.remove("w-36");
  // };

  return (
    <div
      onDragOver={handleDragOver}
      className="relative border rounded-lg text-white px-2 py-1 transition-all"
    >
      <span>Delete</span>

      <div
        ref={deleteZoneRef}
        onDrop={() => console.log("dropped")}
        className="w-0 flex justify-center items-center overflow-hidden aspect-square z-10 absolute top-0 right-0 bg-red-600 border rounded-lg transition-all duration-1000"
      >
        <span className="whitespace-nowrap text-white text-xs">
          Drop here to delete
        </span>
      </div>
    </div>
  );
};
