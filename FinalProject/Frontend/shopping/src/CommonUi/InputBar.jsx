import React from "react";

const InputBar = ({ placeholder, type, onChange }) => {
  return (
    <input
      className="p-2 bg-amber-50 w-full rounded-b-sm border-black m-2 text-slate-700"
      type={type}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};
export default InputBar;
