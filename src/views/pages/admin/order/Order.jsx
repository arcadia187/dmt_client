import React from "react";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useEffect } from "react";
import createAxios, { server_url } from "../../../../constants/variables.js";
import { useState } from "react";
import "../product/productList.scss";
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
export default function Order() {
  const [orders, setOrders] = useState(null);
  const [modelOpen, setModelOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState(null);
  const [statusModel, setStatusModel] = useState(false);
  const [newStatus, selectNewStatus] = useState(false);
  const getOrders = async () => {
    try {
      const axiosInstance = await createAxios();
      const { data } = await axiosInstance.get("order");
      console.log(data.data);
      setOrders(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const handleDelete = async (id) => {
    console.log(id);
    try {
      const axiosInstance = await createAxios();
      const res = await axiosInstance.delete(server_url + "user/delete", {
        id: id,
      });

      window.location.reload(false);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };
  const changeStatus = async ({ id }) => {
    try {
      if (
        newStatus != "order_placed" &&
        newStatus != "order_shipped" &&
        newStatus != "order_delivered" &&
        newStatus != "order_canceled"
      )
        return;
      const axiosInstance = await createAxios();
      const { data } = await axiosInstance.post("order", {
        id: id,
        type: newStatus,
      });
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "customer",
      headerName: "Customer",
      width: 120,
    },
    { field: "cancelled", headerName: "isCancelled", width: 120 },
    { field: "orderAmount", headerName: "Amount", width: 120 },
    {
      headerName: "Status",
      width: 120,
      renderCell: ({ row }) => {
        return (
          <>
            <b>{row.updates[row.updates.length - 1].type}</b>
          </>
        );
      },
    },

    {
      field: "orderedOn",
      headerName: "Date",
      width: 150,
    },

    {
      field: "paymentSuccess",
      headerName: "Payment",
      width: 100,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <button
              onClick={() => {
                setActiveProduct(params.row);
                console.log(params.row);
                setModelOpen(true);
              }}
              className="productListEdit"
            >
              Edit
            </button>

            <DeleteOutlineIcon
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div style={{ height: "100vh" }}>
      <div className="productList">
        {orders && (
          <DataGrid
            rows={orders}
            disableSelectionOnClick
            columns={columns}
            pageSize={8}
            checkboxSelection
            getRowId={(r) => r._id}
          />
        )}
        <CModal
          size="xl"
          scrollable
          visible={modelOpen && activeProduct != null}
          onClose={() => {
            setModelOpen(false);
            setActiveProduct(null);
          }}
        >
          <CModalHeader>
            <CModalTitle>Add product description...</CModalTitle>
          </CModalHeader>
          <CModalBody>
            {
              <div className="rowOrder">
                <div className="productDesc">
                  <span
                    style={{ marginRight: "0.4rem" }}
                    className="mediumHeading"
                  >
                    IsCancelled :
                  </span>
                  <span className="mediumHeading dim">
                    {JSON.stringify(activeProduct?.cancelled)}
                  </span>
                </div>
                <div className="productDesc">
                  <span
                    style={{ marginRight: "0.4rem" }}
                    className="mediumHeading"
                  >
                    Amount :
                  </span>
                  <span className="mediumHeading dim">
                    {activeProduct?.orderAmount}
                  </span>
                </div>
                <div className="productDesc">
                  <span
                    style={{ marginRight: "0.4rem" }}
                    className="mediumHeading"
                  >
                    Customer :
                  </span>
                  <span className="mediumHeading dim">
                    {activeProduct?.customer}
                  </span>
                </div>
                <div className="productDesc">
                  <span
                    style={{ marginRight: "0.4rem" }}
                    className="mediumHeading"
                  >
                    Order Date :
                  </span>
                  <span className="mediumHeading dim">
                    {activeProduct?.orderedOn}
                  </span>
                </div>
                <div className="productDesc">
                  <span
                    style={{ marginRight: "0.4rem" }}
                    className="mediumHeading"
                  >
                    Payment Done :
                  </span>
                  <span className="mediumHeading dim">
                    {JSON.stringify(activeProduct?.paymentSuccess)}
                  </span>
                </div>
                <div className="productDesc">
                  <span
                    style={{ marginRight: "0.4rem" }}
                    className="mediumHeading"
                  >
                    Transaction Id :
                  </span>
                  <span className="mediumHeading dim">
                    {activeProduct?.transactionId}
                  </span>
                </div>
                <div className="productDesc">
                  <span
                    style={{ marginRight: "0.4rem" }}
                    className="mediumHeading"
                  >
                    Status :
                  </span>
                  <span
                    style={{
                      textTransform: "uppercase",
                    }}
                    className="mediumHeading dim"
                  >
                    {activeProduct?.updates.at(-1).type}
                  </span>
                </div>
                <div className="productDesc">
                  <span
                    style={{ marginRight: "0.4rem" }}
                    className="mediumHeading"
                  >
                    Last Updated At :
                  </span>
                  <span className="mediumHeading dim">
                    {JSON.stringify(
                      new Date(activeProduct?.updates.at(-1).time)
                    )}
                  </span>
                </div>
              </div>
            }
          </CModalBody>
          <CModalBody>
            <div
              style={{
                display: "flex",
                gap: "1.2rem",
              }}
            >
              <select
                style={{
                  height: "40px",
                }}
                name="productType"
                id="productType"
                onChange={(e) => {
                  selectNewStatus(e.target.value);
                }}
              >
                <option value="order_placed">ORDER_PLACED</option>
                <option value="order_shipped">ORDER_SHIPPED</option>
                <option value="order_delivered">ORDER_DELIVERED</option>
                <option value="order_canceled">ORDER_CANCELED</option>
              </select>
              <CButton
                onClick={() => changeStatus({ id: activeProduct._id })}
                color="primary"
              >
                Edit Status
              </CButton>
            </div>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setModelOpen(false)}>
              Close
            </CButton>
            <CButton color="primary">Save changes</CButton>
          </CModalFooter>
        </CModal>
      </div>
    </div>
  );
}
