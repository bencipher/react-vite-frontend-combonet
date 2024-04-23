import React, { useId, useRef, useState } from "react";
import logo from "../assets/images/logo.png";
import navData from "../config/menu.json";
import { NavLink, useLocation } from "react-router-dom";
import { NavigationLink } from "../models/menuModel";

const { main }: { main: NavigationLink[] } = navData;

const Navbar = () => {
  const dropdownRef = useRef(null);
  const id = useId();
  const location = useLocation();
  const pathname = location.pathname;
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const linkClass = ({ isActive }) =>
    isActive
      ? "bg-black text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 nav-link inline-block lg:block"
      : "text-black hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 nav-link inline-block lg:block";

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
    console.log("toggle is up ", isDropdownVisible);
  };

  return (
    <nav className="bg-white border-b">
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 py-4">
        <div className="flex h-20 justify-between pt-2">
          <div className="flex flex-1 items-center justify-between md:items-stretch">
            <div className="order-0">
              <NavLink
                className="flex flex-shrink-0 items-center mr-4 md:ml-3 pt-2"
                to="/"
              >
                <img className="h-10 w-auto" src={logo} alt="React Jobs" />
              </NavLink>
            </div>
            {/* <!-- navbar toggler --> */}
            <input
              id="nav-toggle"
              onClick={toggleDropdown}
              type="checkbox"
              className="hidden"
            />
            <label
              id="show-button"
              htmlFor="nav-toggle"
              className={`order-2 flex cursor-pointer items-center lg:order-1 lg:hidden`}
            >
              <svg className="h-6 fill-current" viewBox="0 0 20 20">
                <title>Menu Open</title>
                <path d="M0 3h20v2H0V3z m0 6h20v2H0V9z m0 6h20v2H0V0z"></path>
              </svg>
            </label>
            <label
              id="hide-button"
              htmlFor="nav-toggle"
              className={`order-2 hidden cursor-pointer items-center lg:hidden lg:order-1`}
            >
              <svg className="h-6 fill-current" viewBox="0 0 20 20">
                <title>Menu Close</title>
                <polygon
                  points="11 9 22 9 22 11 11 11 11 22 9 22 9 11 -2 11 -2 9 9 9 9 -2 11 -2"
                  transform="rotate(45 10 10)"
                ></polygon>
              </svg>
            </label>
            <ul
              id="nav-menu"
              className=" navbar-nav order-3 w-full lg:order-1 lg:flex lg:w-auto lg:space-x-2 pt-2"
            >
              {main.map((menu) => (
                <>
                  {menu.hasChildren ? (
                    <li
                      className=" group relative cursor-pointer pt-2 w-20"
                      id="dropdown-button"
                    >
                      <span
                        className={`pt-2 pl-2 md:pt-0 nav-link inline-flex items-center ${
                          menu.children
                            ?.map(({ to }) => to)
                            .includes(pathname) ||
                          menu.children
                            ?.map(({ to }) => `${to}/`)
                            .includes(pathname)
                            ? "active"
                            : ""
                        }`}
                      >
                        {menu.label}
                        <svg
                          className="h-4 w-4 fill-current"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </span>
                      <ul
                        id="dropdown"
                        className={`relative nav-dropdown-list mx-auto duration-300 lg:invisible lg:opacity-0 lg:block lg:h-auto lg:w-[11.5rem] 
                        lg:group-hover:visible lg:group-hover:opacity-100 lg:left-[-99px] text-right text-white ${
                          isDropdownVisible ? "" : "hidden"
                        }`}
                      >
                        {menu.children?.map((child) => (
                          <li className="nav-dropdown-item">
                            <NavLink to={child.to} className={linkClass}>
                              {child.label}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ) : (
                    <li className="nav-item">
                      <NavLink className={linkClass} to={menu.to}>
                        {menu.label}
                      </NavLink>
                    </li>
                  )}
                </>
              ))}
              <li className="nav-item mt-2 lg:hidden">
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
      </div>
    </nav>
  );
};

export default Navbar;
