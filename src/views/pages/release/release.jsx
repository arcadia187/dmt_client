import axios from "axios";
import React from "react";
import { useEffect } from "react";
import Shop from "src/views/pages/shop/shop";
const ReleaseShop = () => {
  const test = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/product/get_releases`
    );
    console.log(data);
  };
  useEffect(() => {
    test();
  }, []);
  return (
    <Shop
      url={`${process.env.REACT_APP_SERVER_URL}product/get_releases`}
      title={"Releases"}
    />
  );
};

export default ReleaseShop;
