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
    title: "blog",
    link: "/blog",
    id: 5,
  },
  {
    title: "contact",
    link: "/contact",
    id: 6,
  },
];
export default function Navbar() {
  const [visible, setVisible] = useState(false);
  const location = useLocation();
  return (
    <CNavbar style={{ padding: "1rem 0" }} expand="lg" className="bg-nav">
      <CContainer className="container" fluid>
        <CNavbarBrand className="navbar_brand" href="#">
          Navbar
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
            {NavbarItems?.map((navLink) => (
              <>
                <CNavItem>
                  <CNavLink
                    className="navLink"
                    href={navLink.link}
                    key={navLink.id}
                    active={navLink.link == location.pathname}
                  >
                    {navLink.title}
                  </CNavLink>
                </CNavItem>
              </>
            ))}
          </CNavbarNav>
          <CForm style={{ marginLeft: "auto" }} className="d-flex">
            <CFormInput
              type="search"
              className="me-2 search_input"
              placeholder="Search"
            />
          </CForm>
          <ShoppingCartIcon style={{ margin: "0 2rem 0 auto" }} />
        </CCollapse>
      </CContainer>
    </CNavbar>
  );
}
