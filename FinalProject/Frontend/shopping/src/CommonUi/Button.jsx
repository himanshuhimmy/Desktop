const Button = ({ children, onClick }) => {
  return (
    <div className="text-center">
      <button
        onClick={onClick}
        className="px-3 bg-[rgb(16,73,189)] text-white py-2 rounded-xl "
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
