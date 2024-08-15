interface IProps {
  name: string;
  placeholder: string;
}

export const Input = ({ name, placeholder }: IProps) => {
  return (
    <label className="block relative">
      <input
        id={name}
        name={name}
        placeholder=""
        className="peer w-full bg-zinc-700  rounded-md p-2 outline-none"
        autoComplete="off"
      />

      <div
        className="
          absolute left-2 -top-2.5 bg-zinc-700 rounded-lg p-1 transition-all
          peer-placeholder-shown:bg-transparent peer-placeholder-shown:top-2.5
        "
      >
        <div className="leading-3 text-xs">{placeholder}</div>
      </div>
    </label>
  );
};
