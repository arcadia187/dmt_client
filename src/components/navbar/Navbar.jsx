import {
  CButton,
  CCollapse,
  CContainer,
  CDropdown,
  CDropdownDivider,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CForm,
  CFormInput,
  CNavbar,
  CNavbarBrand,
  CNavbarNav,
  CNavbarToggler,
  CNavItem,
  CNavLink,
} from "@coreui/react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "./navbar.scss";
import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import logo from "../../assets/Asset 2.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PersonIcon from "@mui/icons-material/Person";
const NavbarItems = [
  {
    title: "home",
    link: "/",
    id: 1,
  },
  {
    title: "shop",
    link: "/shop",
    id: 2,
  },
  {
    title: "artists",
    link: "/artists",
    id: 3,
  },
  {
    title: "new releases",
    link: "/new_releases",
    id: 4,
  },
  {
    title: "Events",
    link: "/blog",
    id: 5,
  },
  {
    title: "contact",
    link: "/contact",
    id: 6,
  },
  // {
  //   title: "orders",
  //   link: "/orders",
  //   id: 6,
  // },
];
function Navbar({ user }) {
  const [visible, setVisible] = useState(false);
  const location = useLocation();
  return (
    <CNavbar style={{ padding: "1rem 0" }} expand="lg" className="bg-nav">
      <CContainer className="container" fluid>
        <CNavbarBrand className="navbar_brand">
          <Link to={"/"}>
            <img src={logo} className="imgLogo" alt="logo" />
          </Link>
        </CNavbarBrand>
        <CNavbarToggler
          className="navbar_toggle"
          style={{ backgroundColor: "white" }}
          aria-label="Toggle navigation"
          aria-expanded={visible}
          onClick={() => setVisible(!visible)}
        />
        <CCollapse className="navbar-collapse" visible={visible}>
          <CNavbarNav id="navbar_ul">
            {NavbarItems?.map((navLink, i) => (
              <>
                <CNavItem key={i}>
                  <CNavLink
                    className="navLink"
                    // href={}
                    key={navLink.id}
                    active={navLink.link == location.pathname}
                  >
                    <Link to={navLink.link}>{navLink.title}</Link>
                  </CNavLink>
                </CNavItem>
              </>
            ))}
          </CNavbarNav>
          {/* <CForm className="form d-flex">
            <CFormInput
              type="search"
              className="me-2 search_input"
              placeholder="Search"
            />
          </CForm> */}
          {Object.keys(user).length === 0 ? (
            <Link to={"/login"} className="secondryBtn">
              Login
            </Link>
          ) : (
            <Link to={"/cart"}>
              <ShoppingCartIcon style={{ margin: "0 2rem 0 auto" }} />
            </Link>
          )}
          {Object.keys(user).length === 0 ? null : (
            <Link to={"/UserProfile"}>
              <PersonIcon style={{ margin: "0 2rem 0 auto" }} />
            </Link>
          )}
        </CCollapse>
      </CContainer>
    </CNavbar>
  );
}
const mapStateToProps = (state) => {
  return {
    user: state.uservalue,
  };
};
export default connect(mapStateToProps)(Navbar);
