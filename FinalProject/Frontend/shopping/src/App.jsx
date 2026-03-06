import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import UserLogin from "./User/UserLogin";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <UserLogin />
    </>
  );
}

export default App;
