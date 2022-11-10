import React from "react";
import Navbar from "src/components/navbar/Navbar";

const DefaultLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main
        style={{
          backgroundImage: `url("../../../assets/Asset 2-100.jpg")`,
          backgroundSize: "cover",
          backgroundColor: "#020310;",
        }}
      >
        {children}
      </main>
    </div>
  );
};

export default DefaultLayout;
