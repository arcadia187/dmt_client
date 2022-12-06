import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
const loadScript = (url) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = url;
    document.body.appendChild(script);
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
  });
};

const Payment = ({ amount, userOrder, user, currency = "INR" }) => {
  const [order, setOrder] = useState(null);

  const generateOrder = async () => {
    const { data } = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}payment/make-payment`,
      {
        amount: amount * 100,
        currency: currency,
        notes: userOrder,
      }
    );
    setOrder(data.razorpayServerResponse);
  };
  const handleResponse = (response) => {
    console.log(response);
  };
  useEffect(() => {
    displayRazorpay();
  }, [order]);
  const displayRazorpay = async () => {
    if (!order) {
      return;
    }
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("Something went wrong, please try again or contact admin");
      return;
    }
    const options = {
      key: process.env.RAZORPAY_KEY,
      amount: order.amount,
      currency: order.currency,
      name: "DMT",
      description: "Test Transaction",
      handler: function (res) {
        handleResponse(res);
      },
      order_id: order.id,
      prefill: {
        name: user.name,
        email: user.email,
      },
      notes: order.notes,
      theme: {
        color: "#3399cc",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <button
      disabled={true}
      className="albumBtn disabled"
      onClick={generateOrder}
    >
      Pay : {amount}
    </button>
  );
};
const mapStateToProps = (state) => {
  return {
    user: state.uservalue,
  };
};
export default connect(mapStateToProps)(Payment);
