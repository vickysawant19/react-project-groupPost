import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import authService from "../../appwrite/auth";
import { useDispatch, useSelector } from "react-redux";
import { login, selectStatus } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const userStatus = useSelector(selectStatus);

  const onSubmit = (values) => {
    authService
      .login(values)
      .then((userData) => {
        if (userData) {
          authService.getCurrentUser().then((user) => {
            if (user) {
              dispatch(login(user));
              navigate("/home");
            }
          });
        } else {
          navigate("/login");
        }
      })
      .catch((error) => {
        console.error("An error occurred during login:", error);
        navigate("/login");
      });
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (userStatus) {
      navigate("/home");
    }
  }, [userStatus, navigate]);

  return (
    <>
      <div className="bg-[#FEFEFE] rounded w-96 mx-auto font-mono border p-2 mt-10">
        <div className="w-full text-center text-xl">
          <h1>Login</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} action="">
          <div className="flex flex-col mx-2 gap-1">
            <label htmlFor="">Email</label>
            <input
              {...register("email", { required: "Email required" })}
              className="border p-2"
              type="Email"
            />
            <label htmlFor="">Password</label>
            <input
              {...register("password", { required: "Password Required" })}
              className="border p-2"
              type="password"
            />
            <button className="w-full mt-4 mb-2 p-2 bg-[#B8E8F1]">Login</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
