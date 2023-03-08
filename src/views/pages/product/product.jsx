import axios from "axios";
import React from "react";
import { useEffect } from "react";
import "./product.css";
import { Carousel } from "react-responsive-carousel";
//Price calculator calculates price based on location.
import PriceCalculator from "src/components/priceCalculator/priceCalculator";
import { useState } from "react";
import { width } from "@mui/system";
import RazorpayLogo from "../../../assets/paymentLogos/razorpay.jpg";
import PaypalLogo from "../../../assets/paymentLogos/paypal.jpg";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import createAxios, { server_url } from "src/constants/variables";
import { connect } from "react-redux";
import Alert from "@mui/material/Alert";
import Payment from "../../../components/payment/Payment";
import LinearProgress from "@mui/material/LinearProgress";

const Product = ({ token, dispatch, user }) => {
  const [product, setProduct] = useState(null);
  // const [varient, setVerient] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  const [cartSuccess, setCartSuccess] = useState(false);
  const [dynamicVariant, setDynamicVariant] = useState("");
  const [selctedOptions, setSelectedOption] = useState({});
  const [isInStock, setIsInStock] = useState(true);
  const renderArtists = () => {
    if (!product.productType === "release") {
      return;
    }
    return (
      <div className="artistContainer marginTop">
        {product.artists.map((el) => {
          return <div className="artistNames">{el}</div>;
        })}
      </div>
    );
  };
  console.log();
  useEffect(() => {
    // write logic for updating in stock message
    setIsInStock(() => {
      const res = product?.variant.filter(checkIfIsInStock);
      return res?.[0]?.stock > 0;
    });
  }, [selctedOptions, product]);

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      const axiosInstance = await createAxios();
      const { data } = await axiosInstance.get(
        `${
          process.env.REACT_APP_SERVER_URL
        }product/${window.location.pathname.slice(1)}`
      );
      setProduct(data.data.data);
      const fetchedProduct = data.data.data;
      // aggregate each field seperately for variant array
      if (!fetchedProduct.variant) {
        return;
      }
      let variantInstance = Object.keys(fetchedProduct.variant[0]);
      let obj = {};

      variantInstance.forEach((variant) => {
        obj[variant] = [];

        fetchedProduct.variant.forEach((el) => {
          obj[variant] = [...obj[variant], el[variant]];
        });

        obj[variant] = [...new Set(obj[variant])];

        // obj=list of different variant with unique value..
      });
      delete obj["stock"];
      setDynamicVariant(obj);
    } catch (e) {
      console.log(e);
    }
  };
  const handleAddToCart = async () => {
    let productPresent;
    if (Object.keys(user).length === 0) {
      return setMessage("You should login before adding product to the cart");
    }
    for (let i = 0; i < user.cart.length; i++) {
      if (
        user.cart[i]?.product === product?._id &&
        user.cart[i]?.varient?.color === selctedOptions?.color &&
        user.cart[i]?.varient?.size === selctedOptions?.size
      ) {
        productPresent = true;
        break;
      } else {
        productPresent = false;
      }
    }
    if (productPresent) {
      setMessage("This product already presents in the cart!");
      setCartSuccess(false);
      return;
    } else {
      const productObj = {
        product: product._id,
        varient: selctedOptions,
        quantity,
      };
      const axiosInstance = await createAxios();
      const { data } = await axiosInstance.post(
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
    }
  };
  if (!product) {
    return <LinearProgress />;
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
  const isSubset = (superObj, subObj) => {
    return Object.keys(subObj).every((ele) => {
      if (typeof subObj[ele] == "object") {
        return isSubset(superObj[ele], subObj[ele]);
      }
      return subObj[ele] === superObj[ele];
    });
  };
  const checkIfIsInStock = (variant) => {
    if (isObjEmpty(selctedOptions)) return true;
    return isSubset(variant, selctedOptions);
  };
  const isObjEmpty = (obj) => {
    return (
      obj && // 👈 null and undefined check
      Object.keys(obj).length === 0 &&
      Object.getPrototypeOf(obj) === Object.prototype
    );
  };
  const renderSelectLogic = () => {
    if (!product.variant) {
      return;
    }
    return (
      <div className="selectBox">
        {Object.keys(dynamicVariant).map((variant, index) => (
          <div>
            <label className="label" htmlFor="option">
              {variant}:
            </label>
            <select
              className="select"
              onChange={(e) => {
                setSelectedOption({
                  ...selctedOptions,
                  [variant]: e.target.value,
                });
              }}
              name="option"
            >
              <option value="none" selected disabled hidden>
                {variant.toUpperCase()}
              </option>
              {dynamicVariant[variant].map((el) => (
                <option value={el}>{el}</option>
              ))}
            </select>
          </div>
        ))}
      </div>
    );
  };
  // const renderBuy = () => {
  //   return ;
  // };
  const renderDescription = () => {
    return product.productDetails.map((e, i) => (
      <div key={i} className="productDesc">
        <span style={{ marginRight: "0.4rem" }} className="mediumHeading">
          {e.field}:
        </span>
        <span className="mediumHeading dim">{e.value}</span>
      </div>
    ));
  };
  return (
    <div className="product whiteColor">
      <div className="productMainContainer">
        <div className="containerProduct">
          <div className="productMainLeft">
            <div className="productMainImageContainer">
              <Carousel autoPlay={false} infiniteLoop={true}>
                <div>
                  <img className="productMainImage" src={product.coverImage} />
                </div>
                {product.images?.map((image, index) => {
                  return (
                    <div>
                      <img
                        className="productMainImage"
                        src={image}
                        alt={"slide" + index + 1}
                      />
                    </div>
                  );
                })}
              </Carousel>
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

            {Boolean(dynamicVariant) ? (
              <div className="productVarient marginTop bodyCopy">
                <div className="bodycopy">Also available in</div>
                {renderSelectLogic()}
                <div className="productAttributes"></div>
              </div>
            ) : null}
            <br />
            {product.productType === "release" ? null : (
              <div className="inStock">
                <p
                  style={{
                    color: isInStock ? "green" : "red",
                    fontSize: "22px",
                  }}
                >
                  {isInStock ? "In stock.." : "Sorry! out of stock.."}
                </p>
              </div>
            )}
            {product.productType === "release" ? null : (
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
            )}
            {renderMessage()}
            {!product.compiledBy ? null : (
              <div className="compiledBy">
                <div className="">Compiled by : </div>
                <div className="subhheading">{product.compiledBy} </div>
              </div>
            )}
            {renderArtists()}
            {product.productType === "release" ? (
              <Payment amount={product.price} />
            ) : (
              <button
                className={` albumBtn marginTop`}
                onClick={() => {
                  handleAddToCart();
                }}
              >
                Add to cart <ShoppingCartIcon fontSize="small" />
              </button>
            )}
            <div className="marginTop bodycopy">Pay securly using </div>
            <div className="bodycopy paymentImagesContainer marginTop">
              {/* <img className="paymentImage" src={PaypalLogo} /> */}
              <img className="paymentImage " src={RazorpayLogo} />
            </div>
          </div>
        </div>

        <div className="description">
          <h4 className="subhheading">Product Details</h4>
          {renderDescription()}
        </div>
        <div className="description">
          <h4 className="subhheading">Product Description</h4>
          <div className="productDesc">{product.description}</div>
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
