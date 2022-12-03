import { CButton } from "@coreui/react";
import React from "react";
import { Link } from "react-router-dom";
import "./productList.scss";
import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useEffect } from "react";
import { axiosInstance, server_url } from "../../../../constants/variables.js";
import { useState } from "react";
import axios from "axios";
export default function Product() {
  const [products, setProducts] = useState(null);
  const getProduct = async () => {
    try {
      const { data } = await axiosInstance.get("product?isFirst=1&limit=10");
      console.log(data.data);
      setProducts(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  const handleDelete = async (id) => {
    console.log(id);
    try {
      const res = await axiosInstance.delete(server_url + "product/delete", {
        id: id,
      });

      window.location.reload(false);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "title",
      headerName: "Title",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img
              className="productListImg"
              src={params.row.coverImage}
              alt=""
            />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "price", headerName: "Price", width: 120 },
    { field: "productType", headerName: "Product Type", width: 120 },
    // { field: "limit", headerName: "limit", width: 120 },
    // { field: "isSeries", headerName: "isSeries", width: 120 },

    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={{
                pathname: "/dashboard/movie/view/" + params.row._id,
              }}
            >
              <button className="productListEdit">Edit</button>
            </Link>
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
        {products && (
          <DataGrid
            rows={products}
            disableSelectionOnClick
            columns={columns}
            pageSize={8}
            checkboxSelection
            getRowId={(r) => r._id}
          />
        )}
      </div>
      <Link to="/admin/add_product">
        <CButton className="albumBtn">Add New Product</CButton>
      </Link>
    </div>
  );
}
