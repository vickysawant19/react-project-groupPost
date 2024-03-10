import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import authService from "../appwrite/auth";

const SignUp = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const [user, setUser] = useState();

  useEffect(() => {
    authService.getCurrentUser().then((user) => setUser(user));
  }, []);

  const onSubmit = (values) => {
    authService.createAccount(values).then((user) => setUser(user));
  };

  console.log(user);

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
          <button type="submit" className="w-full mt-4 mb-2 p-2 bg-[#B8E8F1]">
            SignUp
          </button>
        </form>
      </div>
    </>
  );
};

export default SignUp;
