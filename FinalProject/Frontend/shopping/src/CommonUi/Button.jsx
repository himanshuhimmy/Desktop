import { cn } from "../utils/cn";

const Button = ({ children, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full px-6 py-2 bg-[rgb(16,73,189)] text-white rounded-xl hover:bg-[rgb(12,55,150)] transition-colors duration-200 cursor-pointer",
        className,
      )}
    >
      {children}
    </button>
  );
};

export default Button;
