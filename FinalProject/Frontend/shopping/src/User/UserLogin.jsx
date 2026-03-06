import React from "react";
import InputBar from "../CommonUi/InputBar";
import Button from "../CommonUi/Button";

const UserLogin = () => {
  return (
    <div className="flex p-2 rounded-3xl bg-taupe-300 min-h-screen">
      <div className="w-[50%]">
        welcome
        <InputBar />
        <Button> hello</Button>
      </div>
      <div className="w-[50%]">image</div>
    </div>
  );
};

export default UserLogin;
