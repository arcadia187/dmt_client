import { CButton } from "@coreui/react";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { connect } from "react-redux";
import ProductCard from "src/views/pages/shop/shopCard";
import "./shop.scss";

function Shop() {
  const [products, setProducts] = useState(null);
  const [nextPageUrl, setNextPageUrl] = useState("");
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

  const renderProducts = () => {
    console.log(products);
    if (!products) {
      return <div className="whiteColor">No data to show</div>;
    }
    if (products.length > 0)
      return products.map((el) => {
        return <ProductCard product={el} key={el._id} />;
      });
  };

  useEffect(() => {
    getData(`${process.env.REACT_APP_SERVER_URL}product?isFirst=1&limit=2`);
  }, []);

  return (
    <>
      <div className="shop">
        <div className="shopHeroContainer"></div>
        <div className="productContainer">{renderProducts()}</div>
        <div className="btnContainter">
          <a>
            <CButton
              onClick={() => getData(nextPageUrl)}
              style={{ marginTop: "1.2rem" }}
              className="secondryBtn"
            >
              VIEW MORE
            </CButton>
          </a>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  uservalue: state.uservalue,
  token: state.token,
});

export default connect(mapStateToProps)(Shop);
