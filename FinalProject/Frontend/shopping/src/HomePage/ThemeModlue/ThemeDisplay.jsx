import React, { useContext, useState } from "react";
import strangerthings from "./../../assets/HomePage/Themes/StrangerTHings.jpg";
import harrypotter from "./../../assets/HomePage/Themes/HarryPotter.jpg";
import regular from "./../../assets/HomePage/Themes/Regular.jpg";
import Marvel from "./../../assets/HomePage/Themes/Marvel.jpeg";
import Dc from "./../../assets/HomePage/Themes/DC.jpg";
import AppContext from "../../ContextStore/AppContext";
import { useSearchParams } from "react-router-dom";

const ThemeDisplay = () => {
  let { allThemes, activeTheme, setActiveTheme } = useContext(AppContext);
  console.log(allThemes);

  let [currentTHem, setCurrentTheme] = useState(Dc);
  let [selectedTheme, setSelectedTheme] = useState("69a56d4db7944dfb2c3d010a");

  const themeImages = [
    { id: "69a56d62b7944dfb2c3d010b", img: strangerthings },
    { id: "69a56b37b7944dfb2c3d0108", img: harrypotter },
    { id: "69a56d77b7944dfb2c3d010c", img: regular },
    { id: "69a56d43b7944dfb2c3d0109", img: Marvel },
    { id: "69a56d4db7944dfb2c3d010a", img: Dc },
  ];

  function handleSelectedTheme(id) {
    let img = themeImages.filter((el) => (el.id === id ? el.img : ""));
    setSelectedTheme(id);
    setActiveTheme(id);

    setCurrentTheme(img.map((el) => el.img));
  }

  return (
    <div>
      <div className="w-[90%] m-auto mt-5 h-125 overflow-hidden rounded-3xl relative">
        <img
          className="w-full h-full object-cover hover:scale-[103%] transition-all duration-500 ease-in-out"
          src={currentTHem}
          alt="harry potter banner"
        />
        <p className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-4 p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
          {allThemes !== null &&
            allThemes.map((themes) => {
              return (
                <button
                  onClick={() => handleSelectedTheme(themes._id)}
                  key={themes._id}
                  className={`text-white cursor-zoom-in `}
                >
                  <p
                    className={`py-1 px-4  rounded-sm border-blue-300 transition-all duration-500  ${selectedTheme === themes._id ? `bg-blue-700/50 backdrop-blur-md` : ``}`}
                  >
                    {themes.theme}
                  </p>
                </button>
              );
            })}
        </p>
      </div>
    </div>
  );
};

export default ThemeDisplay;
