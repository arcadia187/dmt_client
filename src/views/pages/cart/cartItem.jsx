import React from "react";
import PriceCalculator from "src/components/priceCalculator/priceCalculator";
import DeleteIcon from "@mui/icons-material/Delete";
import { connect } from "react-redux";
import axios from "axios";
import { server_url } from "src/constants/variables";
import { useState } from "react";

const CartItem = ({
  size,
  product,
  color,
  token,
  dispatch,
  updated,
  setUpdated,
}) => {
  const handleRemoveItem = async () => {
    try {
      const itemToRemove = {
        product: product._id,
        varient: {
          color,
          size,
        },
      };
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}user/remove-product-from-cart`,
        itemToRemove,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedUser = { data: data.updatedCart.data };
      updatedUser.token = token;
      dispatch({ type: "user", value: updatedUser });
      const temp = updated + 1;
      setUpdated(temp);
    } catch (e) {
      console.log(e);
    }
  };
  const renderSize = () => {
    if (!size) {
      return;
    }
    return (
      <div className="marginTop varientContainer">
        <div className="bodycopy whiteColor">Size : </div>
        <div className="bodycopy whiteColor">{size.toUpperCase()}</div>
      </div>
    );
  };
  const renderVerient = () => {
    if (!color) {
      return;
    }
    return (
      <div className="marginTop varientContainer">
        <div className="bodycopy whiteColor">Color : </div>
        <div
          style={{
            backgroundColor: color,
            height: "2rem",
            width: "2rem",
            borderRadius: "5px",
          }}
        ></div>
      </div>
    );
  };
  return (
    <div className="cartItem marginTop">
      <div className="cartItemLeft">
        <div className="cartItemImageContaier">
          <img className="cartItemImage" src={product.coverImage} />
        </div>
      </div>
      <div className="cartItemRight">
        <div className="subhheading whiteColor cartItemHeading">
          {product.title}
        </div>
        <div className="productItemContainerPrice subhheading marginTop whiteColor">
          {product.discount &&
          new Date(product.discount.endDate) > new Date(Date.now()) ? (
            <div>
              <span className="strikeThrough">
                <PriceCalculator price={product.price} />
              </span>{" "}
              <PriceCalculator price={product.price - product.discount.value} />
            </div>
          ) : (
            <PriceCalculator price={product.price} />
          )}
        </div>
        {renderVerient()}
        {renderSize()}
      </div>
      <div className="">
        <DeleteIcon
          className="whiteColor"
          onClick={() => {
            handleRemoveItem();
          }}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.token,
  };
};

export default connect(mapStateToProps)(CartItem);
