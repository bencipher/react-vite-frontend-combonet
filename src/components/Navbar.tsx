import React, { useId, useRef, useState } from "react";
import logo from "../assets/images/logo.png";
import navData from "../config/menu.json";
import { NavLink, useLocation } from "react-router-dom";
import { NavigationLink } from "../models/menuModel";
import { useAuth0 } from "@auth0/auth0-react";
import ProfileButtonNav from "./ProfileButtonNav";

const { main }: { main: NavigationLink[] } = navData;

const Navbar = (onLogin, onLogout) => {
  const id = useId();
  const location = useLocation();
  const pathname = location.pathname;
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const { user } = useAuth0();
  const linkClass = ({ isActive }) =>
    isActive
      ? "text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
      : "text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white";
  const toggleDropdown = () => {
    console.log("should toggle ", isDropdownVisible);
    setIsDropdownVisible(!isDropdownVisible);
  };
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <NavLink
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src={logo} className="h-8" alt="React Jobs" />
        </NavLink>
        <ProfileButtonNav
          user={user}
          onLogin={onLogin}
          onLogout={onLogout}
          toggleDropdown={toggleDropdown}
        />
        <div
          className={`items-center justify-between ${
            isDropdownVisible ? "" : "hidden"
          } w-full md:flex md:w-auto md:order-1 pt-5`}
          id="navbar-user"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {main.map((menu) =>
              menu.hasChildren ? (
                <li
                  key={menu.label}
                  className="group relative cursor-pointer w-20"
                  id="dropdown-button"
                >
                  <span
                    className={` pl-2 md:pt-0 nav-link inline-flex items-center ${
                      menu.children?.map(({ to }) => to).includes(pathname) ||
                      menu.children
                        ?.map(({ to }) => `${to}/`)
                        .includes(pathname)
                        ? "active"
                        : ""
                    }`}
                  >
                    {menu.label}
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </span>
                  <ul
                    id="dropdown"
                    className={`relative nav-dropdown-list mx-auto duration-300 lg:invisible lg:opacity-0 lg:block lg:h-auto lg:w-[11.5rem] lg:group-hover:visible lg:group-hover:opacity-100 lg:left-[-99px] text-right text-white ${
                      isDropdownVisible ? "" : "hidden"
                    }`}
                  >
                    {menu.children?.map((child) => (
                      <li key={child.to} className="nav-dropdown-item">
                        <NavLink to={child.to} className={linkClass}>
                          {child.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={menu.label} className="nav-item">
                  <NavLink className={linkClass} to={menu.to}>
                    {menu.label}
                  </NavLink>
                </li>
              )
            )}
            <li className="nav-item lg:hidden">
              <NavLink
                className="btn btn-white btn-sm border-border"
                to="/contact"
              >
                Request a demo
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
