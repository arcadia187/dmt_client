import axios from "axios";
import React, { useState, useEffect } from "react";
import "./shop.css";
import ProductCard from "./shopCard";

const Shop = () => {
  const [results, setResults] = useState(null);
  const getData = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}product?isFirst=1&limit=3`
      );
      console.log(data);
      setResults(data.data);
    } catch (e) {
      console.log(e);
    }
  };
  const renderCards = () => {
    if (!results) {
      return <div className="whiteColor">No data to show</div>;
    }
    console.log(results);
    return results.map((el) => {
      return <ProductCard product={el} key={el._id} />;
    });
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="shop">
      <div className="shopHeroContainer">
        <h1 className="heading">SHOP</h1>
      </div>
      <div className="productContainer">{renderCards()}</div>
    </div>
  );
};
export default Shop;
