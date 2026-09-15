import React, { useId } from "react";

function Select({ options, label, className = "", ...props }, ref) {
  const id = useId();

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="inline-block mb-2 text-sm font-medium text-var(--ink)"
        >
          {label}
        </label>
      )}

      <select
        {...props}
        id={id}
        ref={ref}
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
      >
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default React.forwardRef(Select);
