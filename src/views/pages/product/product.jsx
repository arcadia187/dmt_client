import axios from "axios";
import React from "react";
import { useEffect } from "react";
import "./product.css";
//Price calculator calculates price based on location.
import PriceCalculator from "src/components/priceCalculator/priceCalculator";
import { useState } from "react";
const Product = () => {
  const [product, setProduct] = useState(null);
  // useEffect(() => {
  //   getIp();
  // }, []);
  //FUnction to fetch the data about the product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${
          process.env.REACT_APP_SERVER_URL
        }product/${window.location.pathname.slice(1)}`
      );
      // console.log(data.data.data);
      setProduct(data.data.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getProduct();
  }, []);
  return (
    <div className="product whiteColor">
      I am produyct <PriceCalculator price={3000} />
    </div>
  );
};

export default Product;
