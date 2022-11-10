import React from "react";
import Navbar from "src/components/navbar/Navbar";
import "./defaultLayout.scss";
const DefaultLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main className="main">{children}</main>
    </div>
  );
};

export default DefaultLayout;
