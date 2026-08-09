import React from "react";

function Logo({ width = "500px" }) {
  return (
    <div>
      <img src="/OurLogo.jpg" alt = "Logo" style ={{width}}/>
    </div>
  );
}

export default Logo;
