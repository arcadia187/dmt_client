import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./userProfile.css";
import "../customerOrderTable/CustomerOrderTable";
import CustomerOrderTable from "../customerOrderTable/CustomerOrderTable";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();
  const [orders, setOrders] = useState(null);
  const getToken = () => {
    let tokenStr = "";
    tokenStr = JSON.parse(localStorage.getItem("persist:root")).token;
    // console.log({ token: JSON.parse(await localStorage.getItem("accesstoken")) });
    const accesstoken = tokenStr.replace(/^"(.*)"$/, "$1");
    setToken(accesstoken);
  };

  const renderOrdersTable = () => {};
  const handleTabClick = (index) => {
    setActiveTab(index);
  };
  const userData = async () => {
    if (!token) {
      return;
    }
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}user/get-user-orders`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      setOrders(data.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    userData();
  }, [token]);
  useEffect(() => {
    getToken();
  }, []);
  const renderProfile = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <>
      <div className="userProfile">
        <div>
          <br />
          <br />
          <br />
          <div className="tabs">
            <button
              className={activeTab === 0 ? "active" : ""}
              onClick={() => handleTabClick(0)}
            >
              All orders
            </button>
            <button
              className={activeTab === 1 ? "active" : ""}
              onClick={() => handleTabClick(1)}
            >
              Settings
            </button>
          </div>
          <div className="tab-content">
            {activeTab === 0 && orders && (
              <CustomerOrderTable orders={orders} />
            )}
            {activeTab === 1 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "100px",
                  color: "white",
                }}
              >
                <div
                  className="secondryBtn"
                  onClick={() => {
                    renderProfile();
                  }}
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
