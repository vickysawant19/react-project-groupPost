import React, { useEffect, useState } from "react";

import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectStatus, selectUser } from "../../store/userSlice";
import Logo from "../Logo";
import Logout from "../Logout";

const NavBar = () => {
  const userData = useSelector(selectUser);
  const status = useSelector(selectStatus);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

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

  useEffect(() => {
    if (!status) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <div className=" w-full font-mono bg-[#B8E8F1] text-xl fixed z-30 ">
        <div className="max-w-screen-xl  mx-auto  flex justify-between items-center  font-sans text-[15px]">
          <div className="flex items-center ">
            <Logo width="30px" />
            <h1 className="mx-2">VS-GroupPostApp </h1>
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
              ""
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
            {status && (
              <div
                onClick={() => {
                  setProfileOpen(!profileOpen);
                }}
                className="w-10 h-10 rounded-full m-2 bg-blue-800 relative"
              >
                <div className="flex items-center w-full h-full justify-center font-bold uppercase text-2xl overflow-hidden rounded-full text-yellow-300">
                  {userData.name.slice(0, 2)}
                </div>
                <div
                  className={`bg-white absolute z-10 top-10 right-5 rounded-xl duration-300 transform origin-top-right transition-all ${
                    profileOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"
                  }`}
                >
                  {userData && (
                    <div className="p-2 bg-blue-900 overflow-hidden rounded-xl text-white">
                      <h1 className="uppercase font-semibold">
                        {userData.name}
                      </h1>
                      <h1 className="italic">{userData.email}</h1>
                      <hr />
                      <Logout />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="h-14"></div>
    </>
  );
};

export default NavBar;
