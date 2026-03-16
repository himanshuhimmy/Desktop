import React, { useContext } from "react";
import strangerthings from "./../../assets/HomePage/Themes/StrangerTHings.jpg";
import harrypotter from "./../../assets/HomePage/Themes/HarryPotter.jpg";
import regular from "./../../assets/HomePage/Themes/Regular.jpg";
import Marvel from "./../../assets/HomePage/Themes/Marvel.jpeg";
import Dc from "./../../assets/HomePage/Themes/DC.jpg";
import AppContext from "../../ContextStore/AppContext";

const themeImages = {
  "69b7b68db93b68ec6f3180e9": strangerthings,
  "69b7b68db93b68ec6f3180e6": harrypotter,
  "69b7b68db93b68ec6f3180ea": regular,
  "69b7b68db93b68ec6f3180e7": Marvel,
  "69b7b68db93b68ec6f3180e8": Dc,
};

const ThemeDisplay = () => {
  const { allThemes, activeTheme, setActiveTheme } = useContext(AppContext);

  const currentTheme = themeImages[activeTheme] || Dc;
  console.log(allThemes);
  return (
    <div>
      <div className="w-[90%] m-auto mt-5 h-125 overflow-hidden rounded-3xl relative">
        {/* ✅ key prop forces remount on theme change */}
        <img
          key={activeTheme}
          className="w-full h-full object-cover transition-opacity duration-300"
          src={currentTheme}
          alt="theme banner"
        />

        <p className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-4 p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
          {allThemes &&
            allThemes.map((theme) => (
              <button
                key={theme._id}
                onClick={() => setActiveTheme(theme._id)} // ✅ directly pass the id string
                className="text-white cursor-pointer"
              >
                <p
                  className={`py-1 px-4 rounded-sm border-blue-300 transition-all duration-500 ${
                    activeTheme === theme._id
                      ? "bg-blue-700/50 backdrop-blur-md"
                      : ""
                  }`}
                >
                  {theme.theme}
                </p>
              </button>
            ))}
        </p>
      </div>
    </div>
  );
};

export default ThemeDisplay;
