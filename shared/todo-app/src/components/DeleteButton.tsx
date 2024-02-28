import { throttle } from "@services/utils";
import { useRef, DragEvent } from "react";

export const DeleteButton = () => {
  const deleteZoneRef = useRef<HTMLDivElement>(null);

  const expandDeleteZone = throttle(250, (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    deleteZoneRef.current?.classList.remove("w-0");
    deleteZoneRef.current?.classList.add("w-36");
  });

  const hideDeleteZone = (event: any) => {
    console.log("leave");
    event.preventDefault();

    deleteZoneRef.current?.classList.add("w-0");
    deleteZoneRef.current?.classList.remove("w-36");
  };

  return (
    <div onDragEnter={expandDeleteZone} onDragLeave={hideDeleteZone} className="relative bg-blue-600">
      <div className="border rounded-lg text-white px-2 py-1">
        <span>Delete</span>
      </div>

      <div
        ref={deleteZoneRef}
        className="
          w-0 flex justify-center items-center overflow-hidden 
          aspect-square z-10 absolute top-0 right-0 bg-red-600 
          rounded-lg transition-all duration-1000
        "
      >
        <span className="whitespace-nowrap text-white text-xs">Drop here to delete</span>
      </div>
    </div>
  );
};
