interface IProps {
  selectedDigit: string | null;
  onStatusClick: (status: "correct" | "misplaced" | "not-used" | null) => void;
}

export const StatusMenu = ({ selectedDigit, onStatusClick }: IProps) => {
  return (
    <div className="absolute top-0 right-0 overflow-hidden">
      <div
        data-open={!!selectedDigit}
        className="flex flex-col gap-y-4 p-4 rounded-l-lg bg-black/50 transition-all translate-x-full data-[open=true]:translate-x-0"
      >
        <button
          type="button"
          onClick={() => onStatusClick("correct")}
          className="border rounded-lg border-white size-12 bg-green-600"
        />
        <button
          type="button"
          onClick={() => onStatusClick("misplaced")}
          className="border rounded-lg border-white size-12 bg-yellow-500"
        />
        <button
          type="button"
          onClick={() => onStatusClick("not-used")}
          className="border rounded-lg border-white size-12 bg-red-600"
        />
        <button
          type="button"
          onClick={() => onStatusClick(null)}
          className="border rounded-lg border-white size-12 text-white"
        >
          clear
        </button>
      </div>
    </div>
  );
};
