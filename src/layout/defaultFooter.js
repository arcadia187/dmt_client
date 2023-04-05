import {
  CButton,
  CCol,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
} from "@coreui/react";
import React, { useState } from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import BandCamppLogo from "../../src/assets/bandcampLogo.png";
import Soundcloud from "../../src/assets/soundcloud-logo-white.png";
import logo from "../assets/Asset 2.png";
import "./footer.scss";
import { Link } from "react-router-dom";
export default function DefaultFooter() {
  return (
    <footer style={{ overflow: "hidden", padding: "0.5rem", color: "white" }}>
      <CRow className="justify-content-center  ">
        <CCol className="welcome_box">
          {/* <h2 className="bold_heading" style={{ textAlign: "center" }}>
            CONTACT
          </h2> */}
          <div className="footer">
            <div className="animate footer-left hidden">
              <div className="logo">
                <img src={logo} alt="" />
              </div>

              <div style={{ marginLeft: "-10px" }}>
                <a href="#" target="_blank">
                  {/* <LinkedInIcon
                    className="footerSocialIcons"
                    sx={{ color: "#c58434" }}
                  /> */}
                </a>{" "}
                &nbsp;
                <a href="#" target="_blank">
                  <YouTubeIcon
                    className="footerSocialIcons"
                    sx={{ color: "#c58434" }}
                  />
                </a>{" "}
                &nbsp;
                <a
                  href="https://instagram.com/dendromusictribe?igshid=YmMyMTA2M2Y="
                  target="_blank"
                >
                  <InstagramIcon
                    className="footerSocialIcons"
                    sx={{ color: "#c58434" }}
                  />
                </a>{" "}
                &nbsp;
                <a
                  href="https://www.facebook.com/dendromusictribe?mibextid=ZbWKwL"
                  target="_blank"
                >
                  <FacebookIcon
                    className="footerSocialIcons"
                    sx={{ color: "#c58434" }}
                  />
                </a>{" "}
                &nbsp;
                <a
                  href="https://dendromusictribe.bandcamp.com/"
                  target="_blank"
                >
                  <img
                    src={BandCamppLogo}
                    className="footerSocialIcons footerimg"
                    sx={{ color: "#c58434" }}
                    style={{ color: "white" }}
                  />
                </a>{" "}
                <a href="https://on.soundcloud.com/NGf4a" target="_blank">
                  <img
                    src={Soundcloud}
                    className="footerSocialIcons footerimg"
                    sx={{ color: "#c58434" }}
                    style={{ color: "white" }}
                  />
                </a>{" "}
                &nbsp;
              </div>
            </div>
            <div className="contactBox animate hidden">
              <div className="contact">
                <span className="dim">Quick Links</span>
                <br />
                {/* <span className="subhheading">Privacy and Policies</span>
                <span className="subhheading">Contact Us</span> */}
                {/* <span className="subhheading">Privacy and Policies</span> */}
                <Link
                  to={"/privacy-and-policies"}
                  className="mediumHeading footermenu"
                >
                  Privacy and Policies
                </Link>
                {/* <Link to={"/contact-us"} className="mediumHeading footermenu">
                  Contact Us
                </Link> */}
                <Link to={"/shop"} className="mediumHeading footermenu">
                  Shop
                </Link>
                <Link to={"/new_releases"} className="mediumHeading footermenu">
                  Releases
                </Link>
              </div>
              <div className="contact contact-right">
                <span className="dim">Contact us</span>
                <br />
                {/* <span className="subhheading"> dendromusictribe@gmail.com</span> */}
                <span className="mediumHeading"> Phone : +91 6394 214 342</span>
                <br />
                <span className="mediumHeading">
                  Email : dendromusictribe@gmail.com
                </span>
                <br />
                <span className="mediumHeading">
                  Address : Prayagraj, Uttar Pradesh , India
                </span>
              </div>
              {/* <div className="contact">
                <span className="dim">MANAGER</span>
                <span className="subhheading">+91 221 321 321</span>
                <span className="mediumHeading">MANAGER@DMT.COM</span>
              </div> */}
            </div>
          </div>
        </CCol>
      </CRow>
    </footer>
  );
}
