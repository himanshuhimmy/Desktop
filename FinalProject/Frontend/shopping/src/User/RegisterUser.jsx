import React, { useState } from "react";
import InputBar from "../CommonUi/InputBar";
import Button from "../CommonUi/Button";
import { useContext } from "react";
import AppContext from "../ContextStore/AppContext";
import axios from "axios";
import UserRegister from "././../assets/Register&loginPages/UserRegister.png";
import { useNavigate } from "react-router-dom";

const RegisterUser = () => {
  let { inputText, setInputText, membershipInfo, loggedIn } =
    useContext(AppContext);

  let [selectedMembership, setSelectedMembership] = useState(null);

  function handleOnchnage(value, field) {
    setInputText((prev) => ({ ...prev, [field]: value }));
  }

  function selectMembership(id) {
    setSelectedMembership(id);
  }
  async function handleRegister() {
    console.log(inputText);
    let finalData = {
      name: inputText.name,
      password: inputText.password,
      plan: selectedMembership,
      isActive: true,
      email: inputText.email,
      //   address: {},
    };
    await axios.post("http://localhost:5000/adduser", finalData);
    setInputText(null);
  }

  let navigate = useNavigate();

  function HandleLoginHere() {
    navigate("/userLogin");
  }
  return (
    <div className="flex justify-center items-center p-2 mx-4">
      <div className=" w-[50%]  ">
        <img className="w-full" src={UserRegister} alt="image" />
      </div>
      <div className="flex flex-col gap-2 w-[50%] justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Create Your Account</h1>
          <p className="font-semibold">
            Join LUXE for a premium shopping experience.
          </p>
        </div>
        <div className="w-[80%] m-auto">
          <p>Full name</p>
          <InputBar
            onChange={(e) => handleOnchnage(e.target.value, "name")}
            placeholder={"Roman Reings"}
            type={"text"}
          ></InputBar>
        </div>
        <div className="w-[80%] m-auto">
          <p>E-Mail Address</p>
          <InputBar
            onChange={(e) => handleOnchnage(e.target.value, "email")}
            placeholder={"example@email.com"}
            type={"email"}
          ></InputBar>
        </div>
        <div className="flex gap-2 w-[80%] m-auto">
          <div className="w-[50%]">
            <p>Password</p>
            <InputBar
              onChange={(e) => handleOnchnage(e.target.value, "password")}
              placeholder={"********"}
              type={"password"}
            ></InputBar>
          </div>
          <div className="w-[50%]">
            <p>Confirm Password</p>
            <InputBar
              onChange={(e) =>
                handleOnchnage(e.target.value, "Confirmpassword")
              }
              placeholder={"********"}
              type={"password"}
            ></InputBar>
          </div>
        </div>

        <h1 className="text-xl font-medium text-center mt-4">
          Select Membership Tear
        </h1>
        <div className="flex justify-around my-2">
          {membershipInfo !== null &&
            membershipInfo.map((memberShip) => {
              return (
                <div key={memberShip._id} className="flex">
                  <button onClick={() => selectMembership(memberShip._id)}>
                    {memberShip.tear}
                  </button>
                </div>
              );
            })}
        </div>
        <div className="text-center">
          <label>
            <input type="checkbox" />I agree to the Terms of Service and Privacy
            Policy.
          </label>
        </div>
        <p className="text-center my-3">
          Already a member?{" "}
          <button onClick={HandleLoginHere}> Login here</button>
        </p>
        <div>
          <Button onClick={handleRegister}>Register Now</Button>
        </div>
      </div>
    </div>
  );
};

export default RegisterUser;
