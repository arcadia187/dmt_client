import axios from "axios";
import React, { useState, useEffect } from "react";
import "./shop.css";
import ProductCard from "./shopCard";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Shop = () => {
  const [products, setProducts] = useState(null);
  const [nextPageUrl, setNextPageUrl] = useState("");
  const [page, setPage] = useState(1);
  const getData = async (url) => {
    try {
      const { data } = await axios.get(url);
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
      return <div className="whiteColor">No data to show</div>;
    }
    console.log(products);
    return products.map((el) => {
      return <ProductCard product={el} key={el._id} />;
    });
  };
  useEffect(() => {
    getData(`${process.env.REACT_APP_SERVER_URL}product?isFirst=1&limit=6`);
  }, []);

  return (
    <div className="shop">
      <div className="shopHeroContainer">
        <h1 className="heading">SHOP</h1>
        <p className="bodyCopy whiteColor" style={{ textAlign: "center" }}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the
          <br /> industry's standard dummy text ever since the 1500s
        </p>
      </div>
      <div className="mainProductContainer">
        <div className="productContainer">{renderCards()}</div>
      </div>
      <div className="btnContainter">
        {page === 1 ? (
          ""
        ) : (
          <button className="secondryBtn">
            Previous Page <ArrowBackIcon />
          </button>
        )}
        <a>
          <button onClick={() => getData(nextPageUrl)} className="secondryBtn">
            Next page <ArrowForwardIcon />
          </button>
        </a>
      </div>
    </div>
  );
};
export default Shop;
