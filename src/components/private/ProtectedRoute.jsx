import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectStatus } from "../../store/userSlice";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const userStatus = useSelector(selectStatus);
  useEffect(() => {
    if (userStatus) {
      console.log(userStatus);
      navigate("/home");
    } else {
      navigate("/login");
    }
  }, [userStatus]);

  return (
    <div>
      ProtectedRoute
      <Outlet />
    </div>
  );
};

export default ProtectedRoute;
