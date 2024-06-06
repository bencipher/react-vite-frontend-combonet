import React, { useId, useRef, useState } from "react";
import logo from "../assets/images/logo.png";
import navData from "../config/menu.json";
import { NavLink, useLocation } from "react-router-dom";
import { NavigationLink } from "../models/menuModel";
import { useAuth0 } from "@auth0/auth0-react";
import { FaUserCircle } from "react-icons/fa";

const { main }: { main: NavigationLink[] } = navData;

const Navbar = () => {
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
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
            type="button"
            className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            id="user-menu-button"
            aria-expanded="false"
            data-dropdown-toggle="user-dropdown"
            data-dropdown-placement="bottom"
          >
            <span className="sr-only">Open user menu</span>

            {user ? (
              <img
                className="w-8 h-8 rounded-full"
                src={user?.picture}
                alt={`${user?.picture}'s photo`}
              />
            ) : (
              <FaUserCircle className="w-8 h-8 rounded-full text-gray-400" />
            )}
          </button>
          <div
            className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
            id="user-dropdown"
          >
            <div className="px-4 py-3">
              <span className="block text-sm text-gray-900 dark:text-white">
                {user?.name}
              </span>
              <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                {user?.email}
              </span>
            </div>
            <ul className="py-2" aria-labelledby="user-menu-button">
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Settings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Earnings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Sign out
                </a>
              </li>
            </ul>
          </div>
          <button
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-user"
            aria-expanded="false"
            onClick={toggleDropdown}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
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
