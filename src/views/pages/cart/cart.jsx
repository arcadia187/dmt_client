import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PriceCalculator from "src/components/priceCalculator/priceCalculator";
import createAxios from "../../../constants/variables";
import "./cart.css";
import CartItem from "./cartItem";
const Cart = ({ token, user, dispatch }) => {
  const [update, setUpdated] = useState(0);
  const [products, setProducts] = useState(null);
  const [sum, setSum] = useState(0);

  const retriveData = async () => {
    try {
      if (!user.cart) {
        return;
      }
      const itemsPromises = await user.cart.map(async (el) => {
        const axiosInstance = await createAxios();
        const { data } = await axiosInstance.get(
          `${process.env.REACT_APP_SERVER_URL}product/${el.product}`
        );
        return {
          product: data.data,
          varient: el.varient,
        };
      });
      const items = await Promise.all(itemsPromises);
      setProducts(items);
    } catch (e) {
      console.log(e);
    }
  };
  const renderCartItems = () => {
    if (!products) {
      return (
        <div className="whiteColor">Nothing to display! add some products</div>
      );
    }
    console.log(products);
    return products.map((el, i) => {
      return (
        <CartItem
          key={i}
          setUpdated={setUpdated}
          updated={update}
          color={el.varient?.color ? el.varient?.color : null}
          size={el.varient?.size ? el.varient?.size : null}
          product={el.product.data}
        />
      );
    });
  };
  const totalAmount = () => {
    if (!products) {
      return;
    }
    let sum = 0;
    products.forEach((el) => {
      sum += el.product.data.price;
    });
    dispatch({ type: "cartTotal", payload: sum });
    setSum(sum);
  };
  useEffect(() => {
    totalAmount();
  }, [products]);
  useEffect(() => {
    retriveData();
  }, [update]);
  if (!token) {
    return (
      <div className="fallBack ">
        <div className="heading whiteColor">
          You need to{" "}
          <Link to={"/login"} style={{ textDecoration: "underline" }}>
            {" "}
            Login
          </Link>{" "}
          first!
        </div>
      </div>
    );
  } else if (user.cart.length === 0) {
    return (
      <div className="fallBack ">
        <div className="heading whiteColor">
          You need to{" "}
          <Link to={"/login"} style={{ textDecoration: "underline" }}>
            {" "}
            Add some products
          </Link>{" "}
          first!
        </div>
      </div>
    );
  }
  return (
    <div className="cart">
      <div className="cartHeading ">
        <div className="heading">
          Cart Items : {user.cart ? user.cart.length : 0}
        </div>
      </div>
      <div className="cartItemsContainer">{renderCartItems()}</div>
      <div className=" subhheading marginTop">
        <div className="whiteColor  cartItemsTotal">
          Total : <PriceCalculator price={sum} />
          <Link to={"/checkout"} className="albumBtn">
            Checkout
          </Link>
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
export default connect(mapStateToProps)(Cart);
