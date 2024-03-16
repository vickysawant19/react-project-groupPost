import React from "react";

const Logo = ({ width = "100px" }) => {
  return (
    <div className="p-2">
      <img width={width} src="src\assets\logo.png" alt="logo" />
    </div>
  );
};

export default Logo;
