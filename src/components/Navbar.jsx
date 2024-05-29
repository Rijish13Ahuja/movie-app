import React from 'react';
import { MdOutlineLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { NavLink } from 'react-router-dom';

const Navbar = (props) => {
    const { mode, setMode } = props;

    const modeHandler1 = () => {
        setMode('light');
        localStorage.setItem("mode", "light");
    };

    const modeHandler2 = () => {
        setMode('dark');
        localStorage.setItem("mode", "dark");
    };

    return (
        <div className={`w-full py-6 px-12 flex justify-between ${mode === "light" ? "bg-white text-black" : "bg-gray-800 text-white"}`}>
            <div className="flex md:gap-x-12 gap-x-4 lg:text-2xl font-semibold">
                <NavLink to="/" activeClassName="font-bold">
                    Home
                </NavLink>
                <NavLink to="/favourites" activeClassName="font-bold">
                    Favourites
                </NavLink>
            </div>
            <div>
                {mode === "dark" ? (
                    <button onClick={modeHandler1} className="focus:outline-none">
                        <MdOutlineLightMode className="text-3xl" />
                    </button>
                ) : (
                    <button onClick={modeHandler2} className="focus:outline-none">
                        <MdDarkMode className="text-3xl" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default Navbar;
