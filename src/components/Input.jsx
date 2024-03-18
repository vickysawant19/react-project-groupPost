import React, { forwardRef, useId } from "react";

const Input = ({ label, type = "text", className = "", ...props }, ref) => {
  const id = useId();
  return (
    <div>
      {label && (
        <label className="w-full font-semibold" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        type={type}
        className={` w-full p-1 mt-1 rounded ${className}`}
        {...props}
      />
    </div>
  );
};

export default forwardRef(Input);
