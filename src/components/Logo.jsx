import React from "react";
import logoImage from "../assets/logo.png";

const Logo = ({ width = "100px" }) => {
  return (
    <div className="p-2">
      <img width={width} src={logoImage} alt="logo" />
    </div>
  );
};

export default Logo;
