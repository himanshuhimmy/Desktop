import React, { useContext } from "react";
import InputBar from "../CommonUi/InputBar";
import Button from "../CommonUi/Button";
import AppContext from "../ContextStore/AppContext";
import axios from "axios";
import adminLoginPhoto from "./../assets/Register&loginPages/AdminLogin.jpg";
import { AdminContext } from "../ContextStore/AdminContext";

const AdminLogin = () => {
  let { inputText, setInputText } = useContext(AppContext);
  let { setAdminData } = useContext(AdminContext);
  function onChangeHandle(value, field) {
    setInputText((prev) => ({ ...prev, [field]: value }));
  }

  function handleAdminLogin() {
    if (inputText === null) {
      return;
    }
    let data = async () => {
      let response = await axios.post("http://localhost:5000/api/admin/login", {
        username: inputText.username,
        password: inputText.password,
      });

      setAdminData(response.data);
      setInputText(null);
      setAdminLoggedIn(true);
    };
    data();
  }

  return (
    <div className="flex justify-center items-center  min-h-screen ">
      <div className="flex w-[80%] rounded-3xl shadow-2xl h-[90vh]   overflow-hidden">
        <div className="w-[50%] flex-col items-center justify-center p-4 m-4">
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
          <div className=" flex justify-around my-6">
            <p> public Global Node: NYC-01</p>
            <p> verified_user SSL Encrypted </p>
            <p> © 2024 LUXE INC.</p>
          </div>
        </div>

        <div className="w-[50%] overflow-hidden">
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
