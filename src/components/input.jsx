import React, { useId } from "react";

const Input = function Input(
  { label, type = "text", placeholder = "", className = "", ...props },
  ref,
) {
  const id = useId();

  return (
    <div className="w-full">
      {label && (
        <label
          className="inline-block mb-2 text-sm font-medium text-var(--ink)"
          htmlFor={id}
        >
          {label}
        </label>
      )}

      <input
        type={type}
        className={`
          w-full
          px-3.5 py-3
          rounded-md
          border border-var(--line)
          bg-var(--surface)
          text-var(--ink)
          outline-none
          transition-colors duration-200
          focus:border-var(--accent)
          ${className}
        `}
        ref={ref}
        {...props}
        id={id}
      ></input>
    </div>
  );
};

export default Input;