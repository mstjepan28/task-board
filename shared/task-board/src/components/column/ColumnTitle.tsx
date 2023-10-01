interface IProps {
  title: string;
}

export const ColumnTitle = ({ title }: IProps) => {
  return (
    <div className="absolute -top-3 inset-x-0 flex justify-center">
      <div className="px-2 py-1 select-none lowercase text-xs truncate text-white leading-4 rounded-lg transition-all transition-150 border border-gray-700 bg-gray-800 group-hover:border-gray-600">
        {title}
      </div>
    </div>
  );
};
