import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import UserLogin from "./User/UserLogin";
import { ContextProvider } from "./ContextStore/AppContext";
import AdminLogin from "./Admin/AdminLogin";
import RegisterUser from "./User/RegisterUser";
import HeadderPage from "./Headder&footer/headderPage";
import RegisterUserPage from "./User/RegisterUserPage";
import AdminLoginPage from "./Admin/AdminLoginPage";
import AppRoutes from "./Routes/AppRoutes";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <ContextProvider>
        <AppRoutes />
      </ContextProvider>
    </>
  );
}

export default App;
