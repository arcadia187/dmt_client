import axios from "axios";
import React, { useState, useEffect } from "react";
import "./shop.css";
import ProductCard from "./shopCard";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import createAxios from "../../../constants/variables";
import { connect } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";

const Shop = ({ title, url, pagination, content, albums, merch }) => {
  const [products, setProducts] = useState(null);
  const [nextPageUrl, setNextPageUrl] = useState("");
  const [page, setPage] = useState(1);
  // console.log({ url });
  const getData = async (url) => {
    try {
      const axiosInstance = await createAxios();
      const { data } = await axiosInstance.get(url);
      console.log(data);
      if (data) {
        if (products == null) setProducts([...data.data]);
        else setProducts((productArray) => [...productArray, ...data.data]);
        setNextPageUrl(data.next);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const renderCards = () => {
    if (!products) {
      return <CircularProgress />;
    }

    return products.map((el) => {
      return <ProductCard product={el} key={el._id} />;
    });
  };
  useEffect(() => {
    getData(url);
  }, []);

  return (
    <div className="shop">
      <div className="shopHeroContainer">
        <h1 className="heading">{title}</h1>
        {/* <p className="bodyCopy whiteColor" style={{ textAlign: "center" }}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the
          <br /> industry's standard dummy text ever since the 1500s
        </p> */}
      </div>
      <div className="mainProductContainer">
        <div className="productContainer">{renderCards()}</div>
      </div>
      {!pagination ? null : (
        <div className="btnContainter">
          {page === 1 ? (
            ""
          ) : (
            <button className="secondryBtn">
              Previous Page <ArrowBackIcon />
            </button>
          )}
          <a>
            <button
              onClick={() => getData(nextPageUrl)}
              className="secondryBtn"
            >
              Next page <ArrowForwardIcon />
            </button>
          </a>
        </div>
      )}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    albums: state.albums,
    merch: state.products,
  };
};
export default connect(mapStateToProps)(Shop);
