import React from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import "./homepage.scss";
import img from "../../../assets/Screenshot (43).png";
export default function Homepage() {
  return (
    <CContainer
      fluid
      style={{ backgroundColor: "black", paddingTop: "4em", color: "wheat" }}
    >
      <CRow
        style={{ backgroundColor: "transparent" }}
        className="justify-content-center row_box"
      >
        <CCol className="welcome_box" lg={5}>
          <h2 className="bold_heading" style={{ textAlign: "center" }}>
            WELCOME TO OUR PORTAL
          </h2>
          <h1>logo</h1>
          <p>
            DMT is a new age psychedelic record label based in India devoted for
            psychedelic culture, music & art. Let's explore the dendrodelic
            realms of enchanted nature.
          </p>
          <CButton
            style={{
              borderRadius: "2rem",
              padding: "0.2rem 2rem",
              background: "transparent",
              color: "yellow",
              borderColor: "yellow",
            }}
          >
            VIEW OUR ALBUMS
          </CButton>
        </CCol>
      </CRow>
      <CRow className="justify-content-center">
        <CCol className="welcome_box" lg={5}>
          <h2 className="bold_heading" style={{ textAlign: "center" }}>
            HOT!
          </h2>
          <div>
            <img src={img} alt="img" />
          </div>
        </CCol>
      </CRow>
    </CContainer>
  );
}
