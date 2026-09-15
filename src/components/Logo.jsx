import React from "react";

function Logo({ width = "500px" }) {
  return (
    <div className="flex items-center">
      <span className="editorial-serif text-2xl sm:text-[1.7rem] font-semibold tracking-[-0.03em] text-var(--ink)">
        MegaBlog
      </span>
    </div>
  );
}

export default Logo;
