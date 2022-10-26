import React, { useEffect, useState } from "react";
import axios from "axios";
import { RAZORPAY_KEY, SERVER_URL } from "../../../config";

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

const Payment = ({ amount, currency = "INR" }) => {
  const [order, setOrder] = useState(null);

  const generateOrder = async () => {
    const { data } = await axios.post(
      `${SERVER_URL}/api/payment/make-payment`,
      {
        amount: amount,
        currency: currency,
        notes: {},
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
      key: RAZORPAY_KEY,
      amount: order.amount,
      currency: order.currency,
      name: "DMT",
      description: "Test Transaction",
      handler: function (res) {
        handleResponse(res);
      },
      order_id: order.id,
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9999999999",
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
    <div className="App" onClick={generateOrder}>
      Make Payment
    </div>
  );
};
export default Payment;
