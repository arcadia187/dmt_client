import React from "react";
import "./PaymentSuccess.css";

const PaymentSuccess = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
      }}
    >
      <div style={{ textAlign: "center" }}>
        Your orders were placed, you will recive a order confirmation
        <br /> in under the next 5minutes, if dont contact our customer care for
        assistance
      </div>
    </div>
  );
};

export default PaymentSuccess;
