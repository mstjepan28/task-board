import { DragEvent, useRef } from "react";

export const DeleteButton = () => {
  const deleteZoneRef = useRef<HTMLDivElement>(null);

  const expandDeleteZone = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    deleteZoneRef.current?.classList.remove("w-0");
    deleteZoneRef.current?.classList.add("w-36");
  };

  const hideDeleteZone = () => {
    deleteZoneRef.current?.classList.add("w-0");
    deleteZoneRef.current?.classList.remove("w-36");
  };

  const deleteItem = () => {
    console.log("implement delete");
    hideDeleteZone();
  };

  return (
    <div className="relative flex" onDragOver={expandDeleteZone} onDragLeave={hideDeleteZone}>
      <span className="invisible px-2 max-h-0">Delete</span>

      <div className="z-10 top-0 right-0 absolute flex flex-col items-end">
        <div className="ml-auto w-fit border rounded-lg text-white px-2 py-1">
          <span>Delete</span>
        </div>

        <div
          ref={deleteZoneRef}
          onDrop={deleteItem}
          className="
            w-0 flex justify-center items-center overflow-hidden 
            aspect-square bg-red-600 rounded-lg transition-all 
            duration-1000 top-1 relative
          "
        >
          <span className="whitespace-nowrap text-white text-xs">Drop here to delete</span>
        </div>
      </div>
    </div>
  );
};
