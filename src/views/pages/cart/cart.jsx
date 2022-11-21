import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { connect } from "react-redux";
import PriceCalculator from "src/components/priceCalculator/priceCalculator";
import "./cart.css";
import CartItem from "./cartItem";
const Cart = ({ token, user }) => {
  const [update, setUpdated] = useState(0);
  const [products, setProducts] = useState(null);
  const [sum, setSum] = useState(0);

  const retriveData = async () => {
    try {
      const itemsPromises = await user.cart.map(async (el) => {
        const { data } = await axios.get(
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
    return products.map((el, i) => {
      return (
        <CartItem
          key={i}
          setUpdated={setUpdated}
          updated={update}
          color={el.varient.color ? el.varient.color : null}
          size={el.varient.size ? el.varient.size : null}
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
    console.log({ sum });
    setSum(sum);
  };
  useEffect(() => {
    totalAmount();
  }, [products]);
  useEffect(() => {
    retriveData();
  }, [update]);
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
          <button className="albumBtn">Checkout</button>
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
