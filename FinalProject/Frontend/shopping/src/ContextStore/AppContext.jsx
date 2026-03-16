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
  let [activeTheme, setActiveTheme] = useState("69b7b68db93b68ec6f3180e8");
  let [allCategorys, setAllCategorys] = useState(null);
  let [allProducts, setAllProducts] = useState(null);

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

    let Categorys = async () => {
      let result = await axios.get("http://localhost:5000/categorys");
      setAllCategorys(result.data);
    };
    Categorys();

    let Product = async () => {
      let result = await axios.get("http://localhost:5000/product/allProducts");
      setAllProducts(result.data);
    };
    Product();
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
    allCategorys,
    setAllCategorys,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;
