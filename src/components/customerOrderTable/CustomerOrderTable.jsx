import React from "react";
import "./customerOrderTable.css";
import ModalBtn from "../modal/Modal";
import StatusObj from "../orderUpdates/OrderUpdates";

function CustomerOrderTable({ orders }) {
  console.log({ orders });

  const renderDate = (date) => {
    return new Date(date).toDateString();
  };
  return (
    <table className="orders-table">
      <thead>
        <tr>
          <th>Customer</th>
          <th>Ordered On</th>
          <th>Payment Success</th>
          <th>Transaction ID</th>
          <th>Status</th>
          <th>Product</th>
          <th>Cancelled</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order._id}>
            <td>{order.customer}</td>
            <td>{renderDate(order.orderedOn)}</td>
            <td>{order.paymentSuccess ? "Yes" : "No"}</td>
            <td>{order.transactionId}</td>
            <td>
              <StatusObj updates={order.updates} />
            </td>
            <td>
              {order.items.productObj[0].title.length < 20
                ? order.items.productObj[0].title
                : `${order.items.productObj[0].title.slice(0, 20)}...`}
            </td>

            <td>{order.cancelled ? "Yes" : "No"}</td>
            <td style={{ display: "flex", alignItems: "center" }}>
              <button className="albumBtn">View</button>
              {!order.cancelled ? (
                <ModalBtn
                  id={order._id}
                  title={"Are you sure you want to cancel the order?"}
                />
              ) : null}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CustomerOrderTable;
