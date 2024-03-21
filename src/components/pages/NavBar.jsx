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
      <div className=" w-full font-mono  bg-[#7EAAC2]  text-xl fixed z-30 shadow ">
        <div className="max-w-screen-xl  mx-auto  flex justify-between items-center  font-sans text-[15px] w-full">
          <div className="flex items-center justify-start pr-3 bg-[#D3ECE8] border rounded-full m-2  ">
            <Logo width="30px" className="font-mono" />
            <h1 className=" font-bold  text-blue-900 uppercase ">VS-Post</h1>
          </div>
          <div className="flex justify-end items-center font-bold text-gray-800 ">
            {status &&
              NavItem.map((item) => (
                <NavLink
                  className=" hover:bg-sky-500 rounded-full p-2 hover:text-white hover:shadow-md"
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
                  className={({ isActive }) =>
                    isActive
                      ? "hidden"
                      : "font-bold text-gray-900 p-2  rounded-full border bg-green-300 hover:bg-green-400"
                  }
                  to={"login"}
                >
                  Login
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "hidden"
                      : "font-bold text-gray-900 p-2 rounded-full border hover:bg-green-400 bg-green-300"
                  }
                  to={"signup"}
                >
                  SignUp
                </NavLink>
              </div>
            )}

            <div className="p-2 flex items-center justify-center">
              {status && (
                <div
                  onClick={() => {
                    setProfileOpen(!profileOpen);
                  }}
                  className="w-10 h-10 rounded-full bg-blue-800 relative"
                >
                  <div className="flex items-center w-full h-full justify-center font-bold uppercase text-3xl overflow-hidden rounded-full text-yellow-300">
                    {userData.name?.slice(0, 1)}
                  </div>
                  <div
                    className={`bg-white absolute z-10 top-10 right-5 rounded-xl duration-300 transform origin-top-right transition-all ${
                      profileOpen
                        ? "scale-100 opacity-100"
                        : "scale-0 opacity-0"
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
      </div>
      <div className="h-16 "></div>
    </>
  );
};

export default NavBar;
