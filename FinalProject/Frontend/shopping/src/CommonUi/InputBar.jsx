import { cn } from "../utils/cn";

const InputBar = ({ placeholder, type, onChange, className }) => {
  return (
    <input
      className={cn(
        "p-2 bg-[rgb(246,246,248)] w-full rounded-xl border border-gray-200 text-slate-700 outline-none focus:border-blue-400 transition-colors duration-200",
        className,
      )}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default InputBar;
