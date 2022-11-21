import React from "react";
import Sidebar from "src/components/dashboard/sidebar/Sidebar";
import "./default.scss";
export default function DefaultLayoutAdmin({ children }) {
  return (
    <div
      className="containerAdminHome"
      style={{ display: "flex", overflowX: "hidden" }}
    >
      <Sidebar />
      <main>{children}</main>
    </div>
  );
}
