import React from "react";
import "../../App.css";

const AuthBackground = () => {
  return (
    <div className="animation-container">
      {[...Array(1000)].map((_, i) => {
        const row = Math.floor(i / 20);
        return <div key={i} className="square" style={{ "--row": row }}></div>;
      })}
    </div>
  );
};

export default AuthBackground;