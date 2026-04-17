import React, { useContext, useEffect, useState } from "react";
import InputBar from "../CommonUi/InputBar";
import Button from "../CommonUi/Button";
import api from "../utils/api";
import loginImage from "./../assets/Register&loginPages/userLogin.png";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setInputText,
  setLoggedIn,
  setUserData,
  setUserAddress,
} from "../Store/appSlice";

const UserLogin = () => {
  let inputText = useSelector((state) => state.app.inputText);
  let dispach = useDispatch();
  const [error, setError] = useState("");

  function onChangeHandle(value, field) {
    dispach(setInputText({ ...inputText, [field]: value }));
  }

  let navigate = useNavigate();
  async function handleLogin() {
    setError("");
    if (!inputText?.email || !inputText?.password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const resp = await api.post("/auth/login", {
        email: inputText.email,
        password: inputText.password,
      });

      const loggedInUser = resp.data.user;
      dispach(setUserData(loggedInUser));

      const result = await api.get(`/users/${loggedInUser.id}`);
      dispach(setUserAddress(result.data));

      dispach(setInputText(null));
      dispach(setLoggedIn(true));
      navigate("/Home");
    } catch (err) {
      if (err.response) {
        const status = err.response.status;
        if (status === 403) {
          setError(
            "Your account has been deactivated. Please contact support.",
          );
        } else if (status === 401 || status === 404) {
          setError("Invalid email or password.");
        } else {
          setError(
            err.response.data.message || "An unexpected error occurred.",
          );
        }
      } else {
        setError("Server is down. Please try again later.");
      }
    }
  }

  function HandleCreateAccount() {
    console.log("clicked");
    navigate("/UserRegister");
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-taupe-300">
      {/* Left: form */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center px-6 py-10">
        <img src="" alt="logo" />
        <h1 className="text-3xl md:text-4xl font-bold">Welcome Back</h1>
        <p className="text-center font-semibold mt-2">
          Please enter your credentials to access your luxury shopping experience.
        </p>

        <div className="flex flex-col w-full max-w-sm gap-3 mt-6">
          <div>
            <p>Username</p>
            <InputBar
              className="focus:border-blue-500"
              onChange={(e) => onChangeHandle(e.target.value, "email")}
              placeholder="Username"
              type="text"
            />
          </div>

          <div>
            <p>Password</p>
            <InputBar
              className="focus:border-blue-500"
              onChange={(e) => onChangeHandle(e.target.value, "password")}
              placeholder="Password"
              type="password"
            />
          </div>

          <div className="flex justify-around gap-3">
            <Button onClick={handleLogin}>Login</Button>
            <Button>BACK</Button>
          </div>

          {error && (
            <p className="text-red-700 text-sm font-bold text-center">{error}</p>
          )}

          <p className="my-4 text-center py-4">
            Don't have an account?{" "}
            <button
              className="hover:text-blue-500 hover:font-bold transition-all duration-300"
              onClick={HandleCreateAccount}
            >
              Create an account
            </button>
          </p>
        </div>
      </div>

      {/* Right: image — hidden on small screens */}
      <div className="hidden md:block md:w-1/2 overflow-hidden h-screen">
        <img className="w-full h-full object-cover" src={loginImage} alt="image" />
      </div>
    </div>
  );
};

export default UserLogin;
