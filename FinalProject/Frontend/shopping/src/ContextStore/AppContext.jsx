import axios from "axios";
import { Children, useEffect, useState } from "react";
import { createContext, useCallback, useContext } from "react";

let AppContext = createContext();

export const ContextProvider = ({ children }) => {
  let [inputText, setInputText] = useState(null);
  let [userData, setUserData] = useState(null);
  let [adminData, setAdminData] = useState(null);
  let [membershipInfo, setMembershipInfo] = useState(null);

  let [loggedIn, setLoggedIn] = useState(false);

  let [allThemes, setAllThemes] = useState(null);
  let [activeTheme, setActiveTheme] = useState(null);

  let [selectedGender, setSelectedGender] = useState("male");

  useEffect(() => {
    let data = async () => {
      let result = await axios.get("http://localhost:5000/memebershipData");
      setMembershipInfo(result.data);
    };
    data();

    let theme = async () => {
      let result = await axios.get("http://localhost:5000/productTheme");
      setAllThemes(result.data);
    };
    theme();
  }, []);

  const value = {
    inputText,
    setInputText,
    userData,
    setUserData,
    adminData,
    setAdminData,
    membershipInfo,
    setMembershipInfo,
    loggedIn,
    setLoggedIn,
    allThemes,
    setAllThemes,
    activeTheme,
    setActiveTheme,
    selectedGender,
    setSelectedGender,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;
