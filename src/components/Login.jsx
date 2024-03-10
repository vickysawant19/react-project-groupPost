import React, { useState } from "react";

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  return (
    <>
      <div className="bg-[#FEFEFE] rounded w-96 mx-auto font-mono border p-2 mt-10">
        <div className="w-full text-center text-xl">
          <h1>Login</h1>
        </div>
        <div className="flex flex-col mx-2 gap-1">
          <label htmlFor="">Username</label>
          <input className="border p-2" type="text" />
          <label htmlFor="">Password</label>
          <input className="border p-2" type="password" />
          <button className="w-full mt-4 mb-2 p-2 bg-[#B8E8F1]">Login</button>
        </div>
      </div>
    </>
  );
};

export default Login;
