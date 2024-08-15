import dayjs from "dayjs";
import { forwardRef, useImperativeHandle, useMemo, useState } from "react";

interface IProps {
  nextRound: () => void;
}

export const WinModal = forwardRef(function WinModal({ nextRound }: IProps, ref) {
  const [finalTime, setFinalTime] = useState("");
  const startTime = useMemo(() => dayjs(), []);

  const onNextRound = () => {
    nextRound();
    closeModal();
  };

  const calcFinalTime = () => {
    const diff = dayjs().diff(startTime, "second");

    const minutes = Math.floor(diff / 60);
    const seconds = diff % 60;

    setFinalTime(`${minutes}:${seconds}`);
  };

  const openModal = () => {
    const modal = document.getElementById("win-modal");
    if (!modal) {
      return;
    }

    modal.classList.add("flex");
    modal.classList.remove("hidden");
  };

  const closeModal = () => {
    const modal = document.getElementById("win-modal");
    if (!modal) {
      return;
    }

    modal.classList.remove("flex");
    modal.classList.add("hidden");
  };

  useImperativeHandle(ref, () => ({
    open: () => {
      calcFinalTime();
      openModal();
    },
  }));

  return (
    <div id="win-modal" className="hidden justify-center items-center fixed z-10 inset-0 bg-green-600">
      <div className="flex flex-col items-center ">
        <span className="text-4xl">You win!</span>
        <span className="text-xl">Final time: {finalTime}</span>
        <button type="button" onClick={onNextRound} className="max-w-lg border rounded-lg px-4 py-2 mt-2 mx-8">
          <span className="text-sm italic">Next round</span>
        </button>
      </div>
    </div>
  );
});
