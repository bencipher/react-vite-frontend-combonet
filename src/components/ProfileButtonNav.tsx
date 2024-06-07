import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const ProfileButtonNav = ({ user, onLogin, onLogout, toggleDropdown }) => {
  const [isUserProfileVisible, setIsUserProfileVisible] = useState(false);

  const toggleUserProfileDropdown = () => {
    console.log("should toggle user dropdown ", isUserProfileVisible);
    setIsUserProfileVisible(!isUserProfileVisible);
  };
  return (
    <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
      <button
        type="button"
        className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
        id="user-menu-button"
        aria-expanded="true"
        data-dropdown-toggle="user-dropdown"
        data-dropdown-placement="bottom"
        onClick={toggleUserProfileDropdown}
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
        className={`z-50 ${
          isUserProfileVisible
            ? "absolute transform lg:translate-x-[-58px] lg:translate-y-[125px] translate-x-[-45px] translate-y-[130px]"
            : "hidden"
        } my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}
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
            <NavLink
              to="/dashboard"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/add-job"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Add Jobs
            </NavLink>
          </li>

          <li>
            <NavLink
              onClick={() => {
                console.log("clicking " + (user ? "logout" : "login"));
                user ? onLogout : onLogin;
              }}
              to="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              {user ? "Sign out" : "Sign in"}
            </NavLink>
          </li>
        </ul>
      </div>
      <button
        data-collapse-toggle="navbar-user"
        type="button"
        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="navbar-user"
        aria-expanded="true"
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
  );
};

export default ProfileButtonNav;
