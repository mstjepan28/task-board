import { twMerge } from "tailwind-merge";

interface IProps {
  className?: string | undefined;
}

export const Searchbar = ({ className }: IProps) => {
  return (
    <div className={twMerge("w-full rounded-lg overflow-hidden border focus-within:border-blue-600", className)}>
      <input type="text" className="w-full bg-gray-950 text-white px-4 py-1 outline-none hover:uppercase" />
    </div>
  );
};
