import React from "react";
import Navbar from "src/components/navbar/Navbar";
import DefaultFooter from "./defaultFooter";
import "./defaultLayout.scss";
const DefaultLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main className="main">
        {children}
        <DefaultFooter />
      </main>
    </div>
  );
};

export default DefaultLayout;
