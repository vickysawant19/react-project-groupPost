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
      <div className=" w-full font-mono  text-white text-xl fixed z-30 ">
        <div className="max-w-screen-xl  mx-auto  flex justify-between items-center  font-sans text-[15px] w-full">
          <div className="flex items-center justify-start w-1/3 ">
            <Logo width="30px" className="font-mono" />
            <h1 className=" font-bold text-xl text-blue-100 uppercase">
              VS-Post{" "}
            </h1>
          </div>
          <div className="flex justify-end gap-2 mx-2 w-2/3 ">
            {status &&
              NavItem.map((item) => (
                <NavLink
                  className="p-1 hover:bg-sky-500"
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
          </div>
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
      <div className="h-16  "></div>
    </>
  );
};

export default NavBar;
