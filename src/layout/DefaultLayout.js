import React from "react";
import Navbar from "src/components/navbar/Navbar";

const DefaultLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default DefaultLayout;
