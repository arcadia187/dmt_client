import React, { useEffect, useState } from "react";
import axios from "axios";

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

function App() {
  const [order, setOrder] = useState(null);

  const generateOrder = async () => {
    const { data } = await axios.post(
      "http://localhost:3001/api/payment/make-payment",
      {
        amount: "120",
        currency: "INR",
        receipt: "tlakshya187@gmail.com",
        notes: {
          // orders: [
          //   {
          //     product: "1234",
          //     deliveryAddress: "xyz city banglore",
          //     orderAmount: 220,
          //     updates: {
          //       type: "order placed",
          //     },
          //     expectedDelivery: new Date("2022-09-28"),
          //     customer: "635253b259299ba54562ead5",
          //   },
          //   {
          //     product: "1234",
          //     deliveryAddress: "xyz city banglore",
          //     orderAmount: 220,
          //     updates: {
          //       type: "order placed",
          //     },
          //     expectedDelivery: new Date("2022-09-28"),
          //     customer: "635253b259299ba54562ead5",
          //   },
          // ],
        },
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
      alert("Razorpay SDK failed to load!");
      return;
    }
    const options = {
      key: "rzp_test_roHEHSgfXREN0X",
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
      Pay now
    </div>
  );
}

export default App;
