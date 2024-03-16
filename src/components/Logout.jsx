import React from "react";
import authService from "../appwrite/auth";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../store/userSlice";
import { Navigate, useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector(selectUser);

  const handleLogout = () => {
    authService.logout().then(() => {
      dispatch(logout());
      navigate("/login");
    });
  };

  return (
    <div className=" hover:bg-sky-500 ">
      <button onClick={handleLogout} className="text-blue-950">
        <h1 className="p-1 ">
          {userData?.name} | <span>Logout</span>
        </h1>
      </button>
    </div>
  );
};

export default Logout;
