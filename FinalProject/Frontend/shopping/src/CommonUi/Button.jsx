const Button = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full px-6 py-2 bg-[rgb(16,73,189)] text-white rounded-xl hover:bg-[rgb(12,55,150)] transition-colors duration-200 cursor-pointer"
    >
      {children}
    </button>
  );
};
export default Button;
