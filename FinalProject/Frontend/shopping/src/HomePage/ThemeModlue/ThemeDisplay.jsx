import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTheme } from "../../Store/appSlice";
import strangerthings from "./../../assets/HomePage/Themes/StrangerTHings.jpg";
import harrypotter from "./../../assets/HomePage/Themes/HarryPotter.jpg";
import regular from "./../../assets/HomePage/Themes/Regular.jpg";
import Marvel from "./../../assets/HomePage/Themes/Marvel.jpeg";
import Dc from "./../../assets/HomePage/Themes/DC.jpg";

const themeImages = {
  "69c0314c912b0ce5a0292afd": strangerthings,
  "69c0314c912b0ce5a0292afe": harrypotter,
  "69c0314c912b0ce5a0292b00": regular,
  "69c0314c912b0ce5a0292aff": Marvel,
  "69c0314c912b0ce5a0292afc": Dc,
};

const ThemeDisplay = () => {
  const dispatch = useDispatch();
  const allThemes = useSelector((state) => state.app.allThemes);
  const activeTheme = useSelector((state) => state.app.activeTheme);

  const currentTheme = themeImages[activeTheme] || Dc;

  return (
    <div>
      <div className="w-[90%] m-auto mt-5 h-125 overflow-hidden rounded-3xl relative">
        <img
          key={activeTheme}
          className="w-full h-full object-cover transition-opacity duration-300"
          src={currentTheme}
          alt="theme banner"
        />
        <p className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-4 p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
          {allThemes &&
            allThemes.themes.map((theme) => (
              <button
                key={theme._id}
                onClick={() => dispatch(setActiveTheme(theme._id))}
                className="text-white cursor-pointer"
              >
                <p
                  className={`py-1 px-4 rounded-sm border-blue-300 transition-all duration-500 ${
                    activeTheme === theme._id
                      ? "bg-blue-700/50 backdrop-blur-md"
                      : ""
                  }`}
                >
                  {theme.name}
                </p>
              </button>
            ))}
        </p>
      </div>
    </div>
  );
};

export default ThemeDisplay;
