import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <div className="w-full bg-[#B8E8F1] ">
        <div className="max-w-screen-md mx-auto font-mono text-xl w-full h-10 flex justify-between  items-center ">
          <h1 className="mx-2">VS-GroupPostApp</h1>
          <div className="flex gap-2 mx-2">
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
        </div>
      </div>
    </>
  );
};

export default NavBar;
