import { twMerge } from "tailwind-merge";

interface IProps {
  className?: string | undefined;
}

export const Searchbar = ({ className }: IProps) => {
  return (
    <div className={twMerge("w-full rounded-lg overflow-hidden", className)}>
      <input type="text" className="w-full bg-gray-100  px-4 py-1 outline-none hover:uppercase rounded-lg" />
    </div>
  );
};
