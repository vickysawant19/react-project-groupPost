import React from "react";

import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectStatus, selectUser } from "../store/userSlice";
import Logo from "./Logo";
import Logout from "./Logout";

const NavBar = () => {
  const userData = useSelector(selectUser);
  const status = useSelector(selectStatus);

  const NavItem = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Add Posts",
      slug: "/addpost",
      active: status,
    },
    {
      name: "Posts",
      slug: "/posts",
      active: status,
    },
  ];

  return (
    <>
      <div className="max-w-screen-md mx-auto font-mono text-xl w-full  ">
        <div className="w-full flex justify-between items-center bg-[#B8E8F1] font-sans text-[15px]">
          <div className="flex items-center ">
            <Logo width="30px" />
            <h1 className="mx-2">VS-GroupPostApp</h1>
          </div>
          <div className="flex items-center gap-2 mx-2 ">
            {status &&
              NavItem.map((item) => (
                <NavLink
                  className="border p-1 hover:bg-sky-500"
                  key={item.name}
                  to={item.slug}
                >
                  {item.name}
                </NavLink>
              ))}

            {userData ? (
              <Logout />
            ) : (
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
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
