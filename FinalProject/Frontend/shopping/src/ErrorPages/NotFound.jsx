import React from "react";
import HeadderPage from "../HeaderFooter/HeaderPage";
import FooterPage from "../HeaderFooter/FooterPage";
import Button from "../CommonUi/Button";
import noFound from "../assets/ErrorPages/NotFound.png";
import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <HeadderPage />
      <div className="bg-[#f6f6f8]">
        <div className="w-[60%] m-auto p-6">
          <div className="text-center ">
            <p className="text-[rgb(15,73,189)] ">Error 404</p>
            <h1 className="text-8xl">NOT</h1>
            <h1 className=" text-8xl">FOUND</h1>
          </div>
          <div className="m-5">
            <h1 className="text-center font-normal text-3xl mb-3">
              The piece you're looking for has vanished.
            </h1>
            <p className="text-center font-extralight w-[50%] m-auto">
              The page you are looking for has been moved, archived, or no
              longer exists in our current collection.
            </p>
            <NavLink to={"/Home"} className=" m-7">
              <Button>Return To Home Page</Button>
            </NavLink>
          </div>
          <div className=" w-full overflow-hidden  rounded-2xl h-[50vh]">
            <img
              className="w-full h-full object-cover object-[center_60%]"
              src={noFound}
            />
          </div>
        </div>
      </div>
      <FooterPage />
    </div>
  );
};

export default NotFound;
