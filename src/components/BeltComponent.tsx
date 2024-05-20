import React from "react";
import { Link } from "react-router-dom";
import defaults from "../config/siteDefaults.json";
import Socials from "./Socials";

const announcement = defaults.announcement;
const BeltComponent = ({ user = null, onLogin, onLogout }) => {
  return (
    <div className="text-center flex flex-col sm:flex-row justify-between flex-wrap bg-black text-white py-2">
      <div className="md:ml-12 belt-social-icons min-w-fit md:px-2">
        <Socials />
      </div>
      <div className="hidden md:block w-full sm:w-3/5 max-w-3/5 text-center">
        {" "}
        {announcement && <p>{announcement}</p>}
      </div>
      <div className="md:mr-12 belt-user-actions min-w-fit text-center sm:text-left">
        {" "}
        {user ? (
          <>
            <span className="mr-2">Welcome, {user.email}!</span>
            <button onClick={onLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link
              to="#"
              onClick={onLogout}
              className="mr-2 hover:text-gray-300"
            >
              Register
            </Link>
            <Link to="#" className="hover:text-gray-300" onClick={onLogin}>
              Sign In
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default BeltComponent;
