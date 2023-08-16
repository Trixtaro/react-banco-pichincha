import React from "react";

const Header = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        background: "white",
        padding: "15px 0",
      }}
    >
      <img
        alt="Banco Pichincha"
        src="/images/logo.svg"
        style={{ width: "200px" }}
      />
    </div>
  );
};

export default Header;
