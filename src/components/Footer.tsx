import React from "react";
import logo from "../assets/images/logo.png";
import { NavLink } from "react-router-dom";
import navData from "../config/menu.json";
import { NavigationLink } from "../models/menuModel";

const { footer }: { footer: NavigationLink[] } = navData;
console.log(footer);
const Navbar = () => {
  const linkClass = ({ isActive }) => {
    let className =
      "text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 w-full";

    if (isActive) {
      className += " bg-black";
    }

    return className;
  };

  return (
    <nav className="bg-black border-none">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-8">
        <div className="flex h-30 items-center justify-between pt-5">
          <div className="flex flex-col flex-1 items-center md:flex-row">
            {/* <!-- Logo --> */}
            <span className="hidden md:block text-white text-center text-lg ml-2 mr-2">
              Powered by
            </span>
            <NavLink
              className="flex flex-shrink-0 items-center mr-4"
              to="https://www.combonettechnology.com/"
            >
              <img className="h-10 w-auto" src={logo} alt="React Jobs" />
            </NavLink>
            <div className="md:ml-auto">
              <div className="flex flex-col md:flex-row space-x-2">
                {footer.map((item) => (
                  <NavLink key={item.label} to={item.to} className={linkClass}>
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </div>
            <div className="md:ml-auto">
              <span className="hidden md:block text-white text-center text-lg ml-2">
                Copyright © 2024 | All Rights Reserved
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
