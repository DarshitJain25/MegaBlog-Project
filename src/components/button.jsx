import React from "react";

function Button({
  children,
  type = "button",
  bgColor = "bg-(--accent)",
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={`
        px-4 py-2.5
        rounded-md
        font-medium
        transition-colors duration-200
        ${bgColor}
        ${textColor}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
export default Button;
