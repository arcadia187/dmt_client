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
import Player from "src/components/music/Player";
import { connect } from "react-redux";
import { useEffect } from "react";
import "./homepage.css";
import ProductCard from "../shop/shopCard";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
function Homepage(props) {
  const fetchAlbums = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}product/get_releases`
      );
      props.dispatch({ type: "albums", payload: data.data });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchAlbums();
    fetchProducts();
  }, []);
  console.log({ albums: props.albums });
  useEffect(() => {}, [props]);
  const renderShopProducts = () => {
    if (!props.products) {
      return <CircularProgress />;
    }
    console.log({ products: props.products });
    return props.products.map((el) => {
      return <ProductCard product={el} key={el._id} />;
    });
  };
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}product?isFirst=1&limit=6`
      );

      props.dispatch({ type: "products", payload: data.data });
    } catch (e) {
      console.log(e);
    }
  };

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
          <Link to={"/new_releases"} className="secondryBtn">
            VIEW OUR ALBUMS
          </Link>
        </CCol>
      </CRow>
      <br />
      <CRow className="justify-content-center ">
        <CCol className="welcome_box" lg={6}>
          <h2 className="bold_heading" style={{ textAlign: "center" }}>
            HOT!
          </h2>
          <Album />
        </CCol>
      </CRow>
      <br />
      <CRow className="justify-content-center ">
        <CCol className="welcome_box" lg={6}>
          <h2 className="bold_heading" style={{ textAlign: "center" }}>
            NEW
          </h2>
          <Song />
        </CCol>
      </CRow>
      <br />
      <CRow className="justify-content-center ">
        <CCol className="welcome_box" lg={8}>
          <h2 className="bold_heading" style={{ textAlign: "center" }}>
            SHOP
          </h2>
          <div className="mainProductContainer">
            <div
              className="productContainerHomePage"
              style={{ display: "flex", justifyContent: "center" }}
            >
              {renderShopProducts()}
            </div>
          </div>
        </CCol>
      </CRow>
      <br />
      {/* <CRow className="justify-content-center ">
        <CCol className="welcome_box" lg={6}>
          <h2 className="bold_heading" style={{ textAlign: "center" }}>
            SAMPLE TRACK
          </h2>
          <Player url="/Srivalli(PagalWorld.com.se).mp3" />
        </CCol>
      </CRow> */}
      <br />
      {/* <CRow className="justify-content-center  ">
        <CCol className="welcome_box">
          <h2 className="bold_heading" style={{ textAlign: "center" }}>
            TOP
          </h2>
          <div className="gallery">
            <div className="galleryImg">
              <LazyLoadImage src={img} alt="" />
            </div>
            <div className="galleryImg">
              <LazyLoadImage src={img} alt="" />
            </div>
            <div className="galleryImg">
              <LazyLoadImage src={img} alt="" />
            </div>
            <div className="galleryImg">
              <LazyLoadImage src={img} alt="" />
            </div>
            <div className="galleryImg">
              <LazyLoadImage src={img} alt="" />
            </div>
            <div className="galleryImg">
              <LazyLoadImage src={img} alt="" />
            </div>
            <div className="galleryImg">
              <LazyLoadImage src={img} alt="" />
            </div>
            <div className="galleryImg">
              <LazyLoadImage src={img} alt="" />
            </div>
            <div className="galleryImg">
              <LazyLoadImage src={img} alt="" />
            </div>
            <div className="galleryImg">
              <LazyLoadImage src={img} alt="" />
            </div>
            <div className="galleryImg">
              <LazyLoadImage src={img} alt="" />
            </div>
            <div className="galleryImg">
              <LazyLoadImage src={img} alt="" />
            </div>
            <div className="galleryImg">
              <LazyLoadImage src={img} alt="" />
            </div>
          </div>
        </CCol>
      </CRow> */}
      <br />
    </CContainer>
  );
}

const mapStateToProps = (state) => ({
  uservalue: state.uservalue,
  token: state.token,
  albums: state.albums,
  products: state.products,
});

export default connect(mapStateToProps)(Homepage);
