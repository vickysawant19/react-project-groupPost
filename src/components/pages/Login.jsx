import React, { useEffect, useLayoutEffect, useState } from "react";
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

  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState(null);

  const dispatch = useDispatch();
  const userStatus = useSelector(selectStatus);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (userStatus) {
      navigate("/home");
    }
  }, [userStatus]);

  const onSubmit = async (values) => {
    try {
      setIsLoading(true);
      const user = await authService.login(values);
      if (user) {
        const userLog = await authService.getCurrentUser();
        if (userLog) {
          dispatch(login(userLog));
          navigate("/home");
        }
      } else {
        navigate("/login");
      }
    } catch (error) {
      // console.error("An error occurred during login:", error);
      setErrMsg(error.message);
      navigate("/login");
    } finally {
      setIsLoading(false);
    }
  };

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
            <div className="text-red-500">
              {errors.email && errors.email.message}
            </div>
            <label htmlFor="">Password</label>
            <input
              {...register("password", { required: "Password Required" })}
              className="border p-2"
              type="password"
            />
            <div className="text-red-500">
              {errors.password && errors.password.message}
            </div>
            {/* bg-[#B8E8F1]" */}
            <button
              disabled={isLoading}
              className={` disabled:bg-gray-600  disabled:border disabled:text-white disabled:text-xl disabled:animate-pulse bg-[#B8E8F1]
              w-full mt-4 mb-2 p-2 `}
            >
              {isLoading ? "....." : "Login "}
            </button>
          </div>
          <div className="px-2 text-red-500"> {errMsg}</div>
        </form>
      </div>
    </>
  );
};

export default Login;
