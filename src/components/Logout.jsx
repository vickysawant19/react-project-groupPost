import React from "react";
import authService from "../appwrite/auth";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../store/userSlice";
import { Navigate, useNavigate } from "react-router-dom";
import Button from "./Button";

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
    <div className="flex my-2 ">
      <Button
        onClick={handleLogout}
        bgColor="bg-red-600 "
        className="text-blue-950 text-sm w-full hover:text-gray-800 hover:bg-red-300"
      >
        Logout
      </Button>
    </div>
  );
};

export default Logout;
