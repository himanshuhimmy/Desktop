import React, { useContext, useEffect, useState } from "react";
import InputBar from "../CommonUi/InputBar";
import Button from "../CommonUi/Button";
import axios from "axios";
import loginImage from "./../assets/Register&loginPages/userLogin.png";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setInputText, setLoggedIn, setUserData, setUserAddress } from "../Store/appSlice";

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
      const resp = await axios.post("http://localhost:5000/api/auth/login", {
        email: inputText.email,
        password: inputText.password,
      });

      const loggedInUser = resp.data.user;
      dispach(setUserData(loggedInUser));

      const result = await axios.get(
        `http://localhost:5000/api/users/${loggedInUser.id}`,
      );
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
              onChange={(e) => onChangeHandle(e.target.value, "email")}
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
          {error && (
            <div className="">
              <p className="text-red-700 text-sm font-bold text-center">
                {error}
              </p>
            </div>
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

      <div className="w-[50%] overflow-hidden h-dvh">
        <img className="w-fit" src={loginImage} alt="image" />
      </div>
    </div>
  );
};

export default UserLogin;
