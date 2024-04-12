import React from "react";
import logo from "../assets/images/logo.png";
import { NavLink } from "react-router-dom";
const Navbar = () => {
  const linkClass = ({ isActive }) =>
    `text-${
      isActive ? "white bg-black" : "black "
    } hover:bg-gray-900 hover:text-white rounded-md px-3 py-2`;
  return (
    <nav className="bg-white border-b ">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-4">
        <div className="flex h-20 items-center justify-between">
          <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
            {/* <!-- Logo --> */}
            <NavLink className="flex flex-shrink-0 items-center mr-4" to="/">
              <img className="h-10 w-auto" src={logo} alt="React Jobs" />
            </NavLink>
            <div className="md:ml-auto">
              <div className="flex space-x-2">
                <NavLink to="/" className={linkClass}>
                  Home
                </NavLink>
                <NavLink to="/jobs" className={linkClass}>
                  Jobs
                </NavLink>
                <NavLink to="/add-job" className={linkClass}>
                  Add Job
                </NavLink>
                <NavLink to="/blogs" className={linkClass}>
                  Blog & Articles
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
