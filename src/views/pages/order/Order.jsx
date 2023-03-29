import React from "react";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useEffect } from "react";
import createAxios, { server_url } from "../../../constants/variables.js";
import { useState } from "react";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "./order.scss";
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import axios from "axios";
import { connect } from "react-redux";
function Order(props) {
  const [orders, setOrders] = useState(null);
  const [modelOpen, setModelOpen] = useState(false);
  const [items, setItems] = useState(null);
  const [mappedOrders, setMappedOrders] = useState(null);
  const [onFocusItems, setOnFocusItems] = useState(null);
  function removeDuplicates(arr) {
    return [...new Set(arr)];
  }
  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${server_url}order?email=${props?.uservalue?.email}`
      );
      console.log(data.data);
      if (!data.data) console.log("No orders");
      setOrders(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const getItems = async (order) => {
    console.log(order);
    let ids = order.items.map((e) => e.product);
    ids = removeDuplicates(ids);
    console.log(ids);
    const { data } = await axios.post(server_url + "product/list", {
      products: ids,
    });
    let res = data.data?.data;
    // let resMappedToId;
    // res.forEach(e=>{
    //     resMappedToId[e._id]=e;
    // })

    setItems(res);

    console.log(res);
  };
  const columns = [
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
                console.log(params.row);
                setOnFocusItems(params.row);
                getItems(params.row);
                setModelOpen(true);
                true;
              }}
              className="productListEdit"
            >
              View Items
            </button>
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
            getRowId={(r) => r._id}
            sx={{
              color: "white",
            }}
          />
        )}
      </div>

      <CModal
        size="xl"
        scrollable
        visible={modelOpen && items != null && onFocusItems != null}
        onClose={() => {
          setModelOpen(false);
        }}
      >
        <CModalHeader>
          <CModalTitle>Ordered Items</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {onFocusItems?.items?.map((item, index) => (
            <>
              {items?.map((el) => (
                <>
                  {el._id === item.product && (
                    <>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "3.2rem",
                          margin: "1rem 0 2rem",
                        }}
                      >
                        <h1>{index + 1}.</h1>
                        <LazyLoadImage
                          width="200px"
                          height="200px"
                          src={el.coverImage}
                        />
                        <h3>{el.title}</h3>
                        <h3>
                          <span
                            style={{
                              color: item.variant.color,
                              textTransform: "capitalize",
                            }}
                          >
                            {item.variant.color}
                          </span>
                          , &nbsp;{" "}
                          <span style={{ textTransform: "uppercase" }}>
                            {item.variant.size}
                          </span>
                        </h3>
                      </div>
                    </>
                  )}
                </>
              ))}
            </>
          ))}
        </CModalBody>

        <CModalFooter>
          <CButton color="secondary" onClick={() => setModelOpen(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
}

const mapStateToProps = (state) => ({
  uservalue: state.uservalue,
  token: state.token,
});

export default connect(mapStateToProps)(Order);
