import { CButton } from "@coreui/react";
import React from "react";
import { Link } from "react-router-dom";
import "./userList.scss";
import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useEffect } from "react";
import createAxios, { server_url } from "../../../../constants/variables.js";
import { useState } from "react";

export default function User() {
  const [users, setUsers] = useState(null);

  const getUsers = async () => {
    try {
      const axiosInstance = await createAxios();
      const { data } = await axiosInstance?.get("auth/all");
      console.log(data.users.data);
      setUsers(data.users.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleDelete = async (id) => {
    console.log(id);
    try {
      const axiosInstance = await createAxios();
      const res = await axiosInstance?.delete(server_url + "user/delete", {
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
      field: "name",
      headerName: "Name",
      width: 200,
      //   renderCell: (params) => {
      //     return (
      //       <div className="productListItem">
      //         <img
      //           className="productListImg"
      //           src={params.row.coverImage}
      //           alt=""
      //         />
      //         {params.row.title}
      //       </div>
      //     );
      //   },
    },
    { field: "isVerified", headerName: "Status", width: 120 },
    { field: "email", headerName: "Email", width: 220 },

    {
      field: "role",
      headerName: "Role",
      width: 150,
    },
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
        {users && (
          <DataGrid
            rows={users}
            disableSelectionOnClick
            columns={columns}
            pageSize={8}
            checkboxSelection
            getRowId={(r) => r._id}
          />
        )}
      </div>
    </div>
  );
}
