import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import authService from "../../appwrite/auth";
import { useDispatch, useSelector } from "react-redux";
import { login, selectUser } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
    getValues,
    setValue,
    clearErrors,
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const userData = useSelector(selectUser);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const onSubmit = async (values) => {
    clearErrors();

    try {
      setIsLoading(true);
      const user = await authService.createAccount(values);
      if (user) {
        dispatch(login(user));
        navigate("/home");
        return;
      }
    } catch (error) {
      // console.log(error.message);
      setError("errMsg", {
        type: "manual",
        message: error.message,
      });

      navigate("/signup");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    clearErrors();
  }, []);

  return (
    <>
      <div className="bg-[#FEFEFE] rounded w-96 mx-auto font-mono border p-2 mt-10">
        <div className="w-full text-center text-xl">
          <h1>SignUp</h1>
        </div>

        <form
          className="flex flex-col mx-2 gap-1"
          onSubmit={handleSubmit(onSubmit)}
          action=""
        >
          <label htmlFor="">Username</label>
          <input
            {...register("name", { required: "Username required" })}
            className="border p-2"
            type="text"
          />
          <div className="text-red-600">
            {errors.name && errors.name.message}
          </div>
          <label htmlFor="">Email</label>
          <input
            {...register("email", {
              required: "Email required",
              pattern: /^\S+@\S+$/i,
            })}
            className="border p-2"
            type="email"
          />
          <div className="text-red-500">
            {errors.email && errors.email.message}
          </div>
          <label htmlFor="">Password</label>
          <input
            {...register("password", { required: "Password required" })}
            className="border p-2"
            type="password"
          />
          <div className="text-red-500">
            {errors.password && errors.password.message}
          </div>
          <button
            disabled={isLoading}
            type="submit"
            className="w-full mt-4 mb-2 p-2 bg-[#B8E8F1] disabled:bg-gray-500"
          >
            SignUp
          </button>
          <div className="text-red-500">
            {isLoading ? "Loading..." : ""}
            {errors.errMsg && (
              <div className="flex ">
                {" "}
                {errors.errMsg.message}
                <div
                  className="border p-1 size-5 flex items-center text-black hover:bg-red-100"
                  onClick={() => clearErrors("errMsg")}
                >
                  {" "}
                  X{" "}
                </div>{" "}
              </div>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;
