import axios from "axios";
import React from "react";
import { useEffect } from "react";
import "./product.css";
//Price calculator calculates price based on location.
import PriceCalculator from "src/components/priceCalculator/priceCalculator";
import { useState } from "react";
import { width } from "@mui/system";
import RazorpayLogo from "../../../assets/paymentLogos/razorpay.jpg";
import PaypalLogo from "../../../assets/paymentLogos/paypal.jpg";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { server_url } from "src/constants/variables";
import { connect } from "react-redux";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";

const Product = ({ token, dispatch, user }) => {
  const [product, setProduct] = useState(null);
  const [varient, setVerient] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  const [cartSuccess, setCartSuccess] = useState(false);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${
          process.env.REACT_APP_SERVER_URL
        }product/${window.location.pathname.slice(1)}`
      );
      setProduct(data.data.data);
    } catch (e) {
      console.log(e);
    }
  };
  const handleAddToCart = async () => {
    let productPresent;

    for (let i = 0; i < user.cart.length; i++) {
      if (
        user.cart[i].product === product._id &&
        user.cart[i].varient.color === varient.color &&
        user.cart[i].varient.size === varient.size
      ) {
        productPresent = true;
        break;
      } else {
        productPresent = false;
      }
    }
    if (productPresent === true) {
      setMessage("This product already presents in the cart!");
      setCartSuccess(false);
      return;
    }
    const productObj = {
      product: product._id,
      varient,
      quantity,
    };
    const { data } = await axios.post(
      `${server_url}user/add-product-to-cart`,
      { product: productObj },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    const updatedUser = { data: data.updatedCart.data };
    updatedUser.token = token;
    dispatch({ type: "user", value: updatedUser });
    setMessage("Product has been added to the cart!");
    setCartSuccess(true);
  };
  useEffect(() => {
    getProduct();
  }, []);
  if (!product) {
    return <div className="whiteColor">Loading</div>;
  }
  const renderMessage = () => {
    if (!message) {
      return;
    }
    return (
      <Alert
        severity={!cartSuccess ? "error" : "success"}
        className="marginTop"
        onClose={() => {
          setMessage("");
        }}
      >
        {message}
      </Alert>
    );
  };

  return (
    <div className="product whiteColor">
      <div className="productMainContainer">
        <div className="productMainLeft">
          <div className="productMainImageContainer">
            <img className="productMainImage" src={product.coverImage} />
          </div>
        </div>
        <div className="productMainRight">
          <h1 className="heading">{product.title} </h1>
          <div className="productPriceContainer subhheading marginTop">
            {product.discount &&
            new Date(product.discount.endDate) > new Date(Date.now()) ? (
              <div className="productMainPrice ">
                <span className="strikeThrough">
                  <PriceCalculator price={product.price} />
                </span>{" "}
                <PriceCalculator
                  price={product.price - product.discount.value}
                />
              </div>
            ) : (
              <PriceCalculator price={product.price} />
            )}
          </div>
          <div className="productMainDescription marginTop bodycopy">
            {product.description}
          </div>
          {product.attribute.variant ? (
            <div className="productVarient marginTop bodyCopy">
              <div className="bodycopy">Also available in</div>
              <div className="productAttributes">
                {product.attribute.variant.map((el, i) => {
                  return (
                    <div
                      key={i}
                      className="marginTop bodycopy productAttributeItem"
                    >
                      <div className="productVarientItem">
                        <div>Size :</div>{" "}
                        <div className="size">{el.size.toUpperCase()}</div>
                      </div>
                      <div className="productVarientItem">
                        <div>Colors :</div>
                        <div className="colorContainer">
                          {el.color.split(" ").map((elm, i) => {
                            return (
                              <div
                                key={i}
                                onClick={() => {
                                  setVerient({
                                    color: elm,
                                    size: el.size,
                                  });
                                }}
                                className={`marginLeft ${
                                  varient && varient.color === elm
                                    ? "active"
                                    : null
                                } `}
                                style={{
                                  backgroundColor: elm,
                                  height: "2rem",
                                  width: "2rem",
                                  borderRadius: "5px",
                                }}
                              ></div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}
          <div className="quantityContainer marginTop subhheading">
            <div
              onClick={() => {
                const temp = quantity + 1;
                setQuantity(temp);
              }}
            >
              +
            </div>
            <div>{quantity}</div>
            <div
              onClick={() => {
                if (quantity <= 1) {
                  return;
                }
                const temp = quantity - 1;
                setQuantity(temp);
              }}
            >
              -
            </div>
          </div>
          {renderMessage()}
          <button
            className={`${!varient ? "disabled" : null} albumBtn marginTop`}
            disabled={!varient ? true : false}
            onClick={() => {
              handleAddToCart();
            }}
          >
            Add to cart <ShoppingCartIcon fontSize="small" />
          </button>
          <div className="marginTop bodycopy">Pay securly using </div>
          <div className="bodycopy paymentImagesContainer marginTop">
            <img className="paymentImage" src={PaypalLogo} />
            <img className="paymentImage marginLeft" src={RazorpayLogo} />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.token,
    user: state.uservalue,
  };
};

export default connect(mapStateToProps)(Product);
