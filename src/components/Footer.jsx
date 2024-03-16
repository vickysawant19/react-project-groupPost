import React from "react";
import Logo from "./Logo";

const Footer = () => {
  return (
    <>
      <div className="bg-[#B8E8F1] w-full h-20 mt-20">
        <div className=" h-full flex content-center items-center justify-center">
          <Logo width="30px" /> Create by vitthal sawant @2024
        </div>
      </div>
    </>
  );
};

export default Footer;
