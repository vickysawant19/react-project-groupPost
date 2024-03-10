import React from "react";

import { NavLink, useLocation } from "react-router-dom";
import conf from "../config/conf";
import authService from "../appwrite/auth";

const NavBar = () => {
  const { pathname: path } = useLocation();
  // console.log(import.meta.env.VITE_APPWRITE_URL);
  console.log(authService);
  return (
    <>
      <div className="w-full bg-[#B8E8F1] ">
        <div className="max-w-screen-md mx-auto font-mono text-xl w-full h-10 flex justify-between  items-center ">
          <div className="flex items-center">
            <img className="w-10 p-1" src="src\assets\logo.png" alt="" />
            <h1 className="mx-2">VS-GroupPostApp</h1>
          </div>
          <div className="flex gap-2 mx-2">
            {path.includes("login") || path.includes("signup") ? (
              <div>
                <NavLink
                  className={({ isActive }) => (isActive ? "hidden" : "")}
                  to={"login"}
                >
                  Login
                </NavLink>

                <NavLink
                  className={({ isActive }) => (isActive ? "hidden" : "")}
                  to={"signup"}
                >
                  SignUp
                </NavLink>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
