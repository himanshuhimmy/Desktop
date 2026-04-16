import { useNavigate } from "react-router-dom";
import React from "react";
import InputBar from "../CommonUi/InputBar";
import Button from "../CommonUi/Button";

import axios from "axios";
import adminLoginPhoto from "./../assets/Register&loginPages/AdminLogin.jpg";
import { useDispatch, useSelector } from "react-redux";
import { setAdminData, setAdminLoggedIn } from "../Store/adminSlice";
import { setInputText } from "../Store/appSlice";

const AdminLogin = () => {
  let inputText = useSelector((state) => state.app.inputText);
  const dispatch = useDispatch();
  const adminLoggedIn = useSelector((state) => state.admin.adminLoggedIn);
  function onChangeHandle(value, field) {
    dispatch(setInputText({ ...inputText, [field]: value }));
  }

  const navigate = useNavigate();
  function handleAdminLogin() {
    if (inputText === null) {
      return;
    }

    let data = async () => {
      let response = await axios.post("http://localhost:5000/api/admin/login", {
        username: inputText.username,
        password: inputText.password,
      });

      dispatch(setAdminData(response.data));
      dispatch(setInputText(null));

      dispatch(setAdminLoggedIn(true));
      navigate("/Admin/dashboard");
    };
    data();
  }
  console.log(adminLoggedIn);
  return (
    <div className="flex justify-center items-center  min-h-screen ">
      <div className="flex flex-col md:flex-row w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden">
        <div className="w-full md:w-1/2 flex flex-col justify-center p-8">
          <div className="my-5">
            <h1 className="text-3xl font-bold mb-2">Secure Admin Portals</h1>
            <p className="text-xl font-normal text-slate-500">
              Authorized personnel only. Please verify your identity to access
              the management dashboard.
            </p>
          </div>
          <div>
            <p>Admin Identifier</p>
            <InputBar
              onChange={(e) => onChangeHandle(e.target.value, "username")}
              placeholder="Username"
              type="text"
            />
          </div>
          <div className="mb-5">
            <p>Password</p>
            <InputBar
              onChange={(e) => onChangeHandle(e.target.value, "password")}
              placeholder="Password"
              type="password"
            />
          </div>
          <Button onClick={handleAdminLogin}>Access Dashboard</Button>
          <div className="flex flex-wrap justify-around gap-2 my-6 text-sm text-gray-500">
            <p>Global Node: NYC-01</p>
            <p>SSL Encrypted</p>
            <p>© 2024 LUXE INC.</p>
          </div>
        </div>

        <div className="hidden md:block md:w-1/2 overflow-hidden">
          <img
            className="w-full  h-full object-cover hover:scale-110 transition-all duration-500 opacity-95"
            src={adminLoginPhoto}
            alt="img"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
