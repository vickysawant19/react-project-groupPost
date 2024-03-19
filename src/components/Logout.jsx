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
    <div className=" hover:bg-sky-500 flex items-center justify-center m-2 ">
      <Button
        onClick={handleLogout}
        bgColor="bg-red-600"
        className="text-blue-950 text-sm"
      >
        Logout
      </Button>
    </div>
  );
};

export default Logout;
