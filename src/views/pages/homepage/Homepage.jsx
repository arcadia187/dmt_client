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
import logo from "../../../assets/Asset 2.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Album from "src/components/album/Album";
import Song from "src/components/song/Song";
import Shop from "src/components/shop/Shop";
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
        <CCol className="welcome_box" lg={6}>
          <h2 className="bold_heading heading" style={{ textAlign: "center" }}>
            WELCOME TO OUR PORTAL
          </h2>
          <LazyLoadImage src={logo} width="300px" alt="" />
          <p className="bodycopy para">
            DMT is a new age psychedelic record label based in India devoted for
            psychedelic culture, music & art. Let's explore the dendrodelic
            realms of enchanted nature.
          </p>
          <CButton className="secondryBtn">VIEW OUR ALBUMS</CButton>
        </CCol>
      </CRow>
      <CRow className="justify-content-center ">
        <CCol className="welcome_box" lg={6}>
          <h2 className="bold_heading" style={{ textAlign: "center" }}>
            HOT!
          </h2>
          <Album />
        </CCol>
      </CRow>
      <CRow className="justify-content-center ">
        <CCol className="welcome_box" lg={6}>
          <h2 className="bold_heading" style={{ textAlign: "center" }}>
            NEW
          </h2>
          <Song />
        </CCol>
      </CRow>
      <CRow className="justify-content-center ">
        <CCol className="welcome_box" lg={6}>
          <h2 className="bold_heading" style={{ textAlign: "center" }}>
            SHOP
          </h2>
          <Shop />
        </CCol>
      </CRow>
    </CContainer>
  );
}
