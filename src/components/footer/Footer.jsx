import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import logo from "../../assets/Asset 2.png";
import "./footer.scss";
export default function () {
  return (
    <div className="footer">
      <div>
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <div>
          <p>
            Dmt Is A New Age Psychedelic Record Label Based In India Devoted For
            Psychedelic Culture, Music & Art. Our Aim Is To Promote And Release
            Upcoming Artist Alliance Sharing Same Goal, So Let's Explore The
            Dendrodelic Realms Of Enchanted Nature.
          </p>
        </div>
        <div>
          <a href="#" target="_blank">
            <LinkedInIcon
              className="footerSocialIcons"
              sx={{ color: "#c58434" }}
            />
          </a>{" "}
          &nbsp;
          <a href="#" target="_blank">
            <YouTubeIcon
              className="footerSocialIcons"
              sx={{ color: "#c58434" }}
            />
          </a>{" "}
          &nbsp;
          <a href="#" target="_blank">
            <InstagramIcon
              className="footerSocialIcons"
              sx={{ color: "#c58434" }}
            />
          </a>{" "}
          &nbsp;
          <a href="#" target="_blank">
            <FacebookIcon
              className="footerSocialIcons"
              sx={{ color: "#c58434" }}
            />
          </a>{" "}
          &nbsp;
          <a href="#" target="_blank">
            <TwitterIcon
              className="footerSocialIcons"
              sx={{ color: "#c58434" }}
            />
          </a>{" "}
          &nbsp;
        </div>
      </div>
      <div className="contactBox">
        <div className="contact">
          <span className="dim">MANAGER</span>
          <span className="subhheading">+91 221 321 321</span>
          <span className="mediumHeading">MANAGER@DMT.COM</span>
        </div>
        <div className="contact">
          <span className="dim">MANAGER</span>
          <span className="subhheading">+91 221 321 321</span>
          <span className="mediumHeading">MANAGER@DMT.COM</span>
        </div>
        <div className="contact">
          <span className="dim">MANAGER</span>
          <span className="subhheading">+91 221 321 321</span>
          <span className="mediumHeading">MANAGER@DMT.COM</span>
        </div>
      </div>
      <div className="contactForm">
        <h4 className="subhheading">CONTACT FORM</h4>
        <form action="">
          <div className="formGroup" style={{ display: "flex" }}>
            <input type="text" placeholder="FULL NAME" required />
            <input type="email" placeholder="EMAIL ADDRESS" required />
          </div>
          <input type="text" placeholder="SUBJECT" required />
          <textarea
            rows="6"
            cols="45"
            type="text"
            placeholder="MESSAGE"
            required
          />
          <button className="secondryBtn smallBtn">SUBMIT</button>
        </form>
      </div>
    </div>
  );
}
