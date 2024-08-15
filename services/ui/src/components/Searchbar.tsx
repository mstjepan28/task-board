import { useRef } from "react";
import { HiSearch, HiX } from "react-icons/hi";

interface IProps {
  searchValue?: string | undefined;
  searchFn: (query: string) => void;
}

export const Searchbar = ({ searchValue, searchFn }: IProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const clearInput = () => {
    if (!inputRef || !inputRef.current) {
      console.error("No search input found");
      return;
    }

    inputRef.current.value = "";
    searchFn("");
  };

  return (
    <div
      className="
        w-full flex items-center gap-x-2.5 rounded-lg border border-gray-300 bg-gray-50 px-3
        focus-within:border-primary-600 focus-within:ring-primary-600
      "
    >
      <HiSearch size="16" className="text-gray-600" />

      <input
        ref={inputRef}
        placeholder="Search..."
        defaultValue={searchValue}
        onChange={({ target }) => searchFn(target.value)}
        className="peer w-full bg-transparent py-2 border-none placeholder:text-gray-500 focus:outline-none"
      />

      <button type="button" onClick={clearInput} className="peer-placeholder-shown:hidden">
        <HiX size="16" className="text-gray-600" />
      </button>
    </div>
  );
};
