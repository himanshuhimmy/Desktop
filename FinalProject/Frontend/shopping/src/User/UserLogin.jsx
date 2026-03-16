import React, { useContext, useState } from "react";
import InputBar from "../CommonUi/InputBar";
import Button from "../CommonUi/Button";
import AppContext, { ContextProvider } from "../ContextStore/AppContext";
import axios from "axios";
import loginImage from "./../assets/Register&loginPages/userLogin.png";
import { Navigate, useNavigate } from "react-router-dom";

const UserLogin = () => {
  let { inputText, setLoggedIn, setInputText, setUserData } =
    useContext(AppContext);
  function onChangeHandle(value, field) {
    setInputText((prev) => ({ ...prev, [field]: value }));
  }

  let navigate = useNavigate();
  async function handleLogin() {
    try {
      const resp = await axios.post("http://localhost:5000/login", {
        username: inputText.username,
        password: inputText.password,
      });

      setUserData(resp.data);
      setInputText(null);
      setLoggedIn(true);
      navigate("/Home");
    } catch (error) {
      console.error(error);
    }
  }

  function HandleCreateAccount() {
    console.log("clicked");
    navigate("/UserRegister");
  }
  return (
    <div className="flex items-center justify-center min-h-lvh bg-taupe-300">
      <div className="w-[50%] flex flex-col items-center justify-center">
        <img src="" alt="logo" />

        <h1 className="text-4xl font-bold">Welcome Back</h1>

        <p className="text-center font-semibold">
          Please enter your credentials to access your luxury shopping
          experience.
        </p>

        <div className="flex flex-col w-[90%] gap-3 mt-6 ">
          <div className="w-[60%] m-auto">
            <p>Username</p>
            <InputBar
              onChange={(e) => onChangeHandle(e.target.value, "username")}
              placeholder="Username"
              type="text"
            />
          </div>

          <div className="w-[60%] m-auto">
            <p>Password</p>
            <InputBar
              onChange={(e) => onChangeHandle(e.target.value, "password")}
              placeholder="Password"
              type="password"
            />
          </div>
          <div className="flex justify-around w-[50%] m-auto">
            <Button onClick={handleLogin}>Login</Button>
            <Button>BACK</Button>
          </div>

          <p className="my-4 text-center py-4">
            Don't have an account?{" "}
            <button onClick={HandleCreateAccount}>Create an account</button>
          </p>
        </div>
      </div>

      <div className="w-[50%] overflow-hidden h-dvh">
        <img className="w-fit" src={loginImage} alt="image" />
      </div>
    </div>
  );
};

export default UserLogin;
