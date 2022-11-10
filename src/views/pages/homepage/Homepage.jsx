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
// import logo from "../../../assets/Asset 4.svg";
import img from "../../../assets/Screenshot (43).png";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Album from "src/components/album/Album";
export default function Homepage() {
  return (
    <CContainer
      fluid
      className="container"
      style={{
        overflow: "hidden",
      }}
    >
      <CRow className="justify-content-center row_box">
        <CCol className="welcome_box" lg={5}>
          <h2 className="bold_heading" style={{ textAlign: "center" }}>
            WELCOME TO OUR PORTAL
          </h2>
          <h1>
            {/* <img src={logo} width="300px" alt="" /> */}
            LOGO
          </h1>
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
              color: "#fee092",
              borderColor: "#fee092",
            }}
          >
            VIEW OUR ALBUMS
          </CButton>
        </CCol>
      </CRow>
      <CRow className="justify-content-center ">
        <CCol className="welcome_box" lg={5}>
          <h2 className="bold_heading" style={{ textAlign: "center" }}>
            HOT!
          </h2>
          <Album />
        </CCol>
      </CRow>
    </CContainer>
  );
}
