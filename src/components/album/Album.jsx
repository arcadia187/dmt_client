import { CButton } from "@coreui/react";
import React from "react";
import "./album.scss";
export default function Album() {
  return (
    <div
      className="album"
      style={{
        backgroundImage: `url("../../Screenshot (48).png")`,
        backgroundSize: "cover",
      }}
    >
      <div className="trackCredit blackColorLayer">
        <h3 className="boldName creditName">BIOTIC CEREMONIAL</h3>
        <p className="credit">compiled by DAVER DEMON</p>
        <CButton className="albumBtn secondryBtn">GET IT NOW</CButton>
      </div>
    </div>
  );
}
