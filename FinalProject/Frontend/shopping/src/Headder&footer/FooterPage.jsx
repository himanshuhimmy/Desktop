import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTheme } from "../Store/appSlice";
import ThemeIcon from "../assets/Svgs/ThemeIcon.svg";

import insta from "../assets/Svgs/Socials/InstaGram.svg";
import faceboobk from "../assets/Svgs/Socials/Facebook.svg";
import Whats from "../assets/Svgs/Socials/whatsapp.svg";
import { Link } from "react-router-dom";

const FooterPage = () => {
  const dispatch = useDispatch();
  const activeTheme = useSelector((state) => state.app.activeTheme);
  const allThemes = useSelector((state) => state.app.allThemes);

  let title = "text-xl font-bold flex mb-4";
  let subtitle = "font-extralight mb-1";
  let socialStyle = "h-5 mb-3";

  function handleOnClickTheme(id) {
    dispatch(setActiveTheme(id));
  }

  return (
    <div className="bg-[rgb(15,23,42)] p-6 flex justify-around text-white">
      <div className="w-[25%]">
        <h1 className={title}>
          <img className="h-7" src={ThemeIcon} alt="icon " />
          Premium Themes
        </h1>
        <p className={subtitle}>
          Elevating your fandom with high-quality, authentic, and premium gear
          from the worlds you love.
        </p>
      </div>
      <div>
        <h1 className={title}>Themes</h1>
        {allThemes !== null &&
          allThemes.themes.map((themes) => {
            return (
              <p>
                <button
                  onClick={() => handleOnClickTheme(themes._id)}
                  className={` ${themes._id === activeTheme ? "mb-1 font-normal text-[rgb(35,63,143)]" : subtitle}`}
                >
                  {themes.name}
                </button>
              </p>
            );
          })}
      </div>
      <div>
        <h1 className={title}>Support</h1>
        <div className="flex flex-col">
          <Link className={subtitle} to="/support/contact">
            Contact Us
          </Link>
          <Link className={subtitle} to="/support/terms">
            Terms & Conditions
          </Link>
          <Link className={subtitle} to="/support/policy">
            Privacy Policy
          </Link>
        </div>
      </div>
      <div>
        <h1 className={title}>Socials</h1>
        <p className=" flex flex-col justify-center">
          <img className={socialStyle} src={insta} alt="insta" />
          <img className={socialStyle} src={faceboobk} alt="facebbok" />
          <img className={socialStyle} src={Whats} alt="whatsapp" />
        </p>
      </div>
    </div>
  );
};

export default FooterPage;
