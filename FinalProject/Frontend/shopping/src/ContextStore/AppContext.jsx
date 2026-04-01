import axios from "axios";
import { Children, useEffect, useState } from "react";
import { createContext, useCallback, useContext } from "react";

let AppContext = createContext();

export const ContextProvider = ({ children }) => {
  let [inputText, setInputText] = useState(null);
  let [userAddress, setUserAddress] = useState(
    JSON.parse(localStorage.getItem("userAddress")) || null,
  );
  let [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userData")) || null,
  );
  let [adminData, setAdminData] = useState(null);
  let [membershipInfo, setMembershipInfo] = useState(null);

  let [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("loggedIn") === "true",
  );
  let [refresh, setRefresh] = useState(0);
  let [selectedProduct, setSelectedProduct] = useState(
    JSON.parse(localStorage.getItem("selectedProduct")) || null,
  );
  let [selectedProductId, setSelectedProductId] = useState(
    JSON.parse(localStorage.getItem("selectedProductId")) || null,
  );

  let [allThemes, setAllThemes] = useState(null);
  let [activeTheme, setActiveTheme] = useState("69c0314c912b0ce5a0292afc");
  let [allCategorys, setAllCategorys] = useState(null);
  let [activeCategory, setActiveCategory] = useState("Tops");
  let [allProducts, setAllProducts] = useState(null);
  let [userWishList, setUserWishList] = useState(null);

  let [selectedGender, setSelectedGender] = useState("male");

  let [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || null,
  );

  let [wishList, setWishList] = useState(
    JSON.parse(localStorage.getItem("wishList")) || null,
  );

  useEffect(() => {
    let data = async () => {
      let result = await axios.get("http://localhost:5000/api/memberships");
      setMembershipInfo(result.data);
    };
    data();

    let theme = async () => {
      let result = await axios.get("http://localhost:5000/api/themes");
      setAllThemes(result.data);
    };
    theme();

    let Categorys = async () => {
      let result = await axios.get("http://localhost:5000/api/categories");
      setAllCategorys(result.data);
    };
    Categorys();

    let Product = async () => {
      let result = await axios.get("http://localhost:5000/api/products");
      setAllProducts(result.data);
    };
    Product();
  }, []);

  useEffect(() => {
    localStorage.setItem("loggedIn", loggedIn);
  }, [loggedIn]);

  useEffect(() => {
    let product = async () => {
      let data = await axios.get(
        `http://localhost:5000/api/products/${selectedProductId}`,
      );
      setSelectedProduct(data.data);
    };
    product();
  }, [selectedProductId]);

  useEffect(() => {
    localStorage.setItem("selectedProduct", JSON.stringify(selectedProduct));
    localStorage.setItem(
      "selectedProductId",
      JSON.stringify(selectedProductId),
    );
  }, [selectedProductId]);

  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(userData));
    localStorage.setItem("userAddress", JSON.stringify(userAddress));
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("wishList", JSON.stringify(wishList));
  }, [userData, userAddress, cart, wishList]);

  useEffect(() => {
    if (!userData?.id) return;

    let result = async () => {
      try {
        console.log(userData.id);
        let data = await axios.get(
          `http://localhost:5000/api/wishlist?userId=${userData.id}`,
        );
        setWishList(data.data);
      } catch (err) {
        console.log("WISHLIST FETCH ERROR:", err.response.data);
      }
    };
    result();

    let cartFetch = async () => {
      let FetchedUserCart = await axios.get(
        `http://localhost:5000/api/cart?userId=${userData.id}`,
      );
      setCart(FetchedUserCart.data);
    };
    cartFetch();
  }, [userData?.id, refresh]);

  useEffect(() => {
    if (!userData?.id) return;

    let data = async () => {
      let result = await axios.get(
        `http://localhost:5000/api/users/${userData.id}`,
      );
      setUserAddress(result.data);
    };
    data();
  }, [userData?.id]);

  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(userData));
    localStorage.setItem("userAddress", JSON.stringify(userAddress));
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("wishList", JSON.stringify(wishList));
  }, [userData]);

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
    allProducts,
    activeCategory,
    setActiveCategory,
    userWishList,
    setUserWishList,
    userAddress,
    setUserAddress,
    selectedProduct,
    setSelectedProduct,
    selectedProductId,
    setSelectedProductId,
    cart,
    setCart,
    wishList,
    setWishList,
    refresh,
    setRefresh,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;
