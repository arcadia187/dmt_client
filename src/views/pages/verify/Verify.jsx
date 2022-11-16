import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { server_url } from "src/constants/variables";
import "./verify.scss";
export default function Verify() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState(" Verification successfull");
  let { token } = useParams();
  const navigate = useNavigate();
  const verifyToken = async () => {
    return await axios.get(server_url + `auth/verify?token=${token}`);
  };
  useEffect(() => {
    verifyToken(token)
      .then((result) => {
        console.log(result);
        if (!result.data.success) {
          navigate("/500");
        }
        if (result.data?.data?.isVerified) {
          setMessage("Email is already verified, Please login");
        }
        setIsSuccess(true);
      })
      .catch((e) => {
        console.log(e);
        navigate("/500");
      });
  }, []);
  return (
    <div>
      {isSuccess ? (
        <div class="wrapper">
          <svg
            class="checkmark"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52 52"
          >
            {" "}
            <circle
              class="checkmark__circle"
              cx="26"
              cy="26"
              r="25"
              fill="none"
            />{" "}
            <path
              class="checkmark__check"
              fill="none"
              d="M14.1 27.2l7.1 7.2 16.7-16.8"
            />
          </svg>
          <h4 style={{ marginLeft: "1.2rem" }}>{message}</h4>
        </div>
      ) : (
        <div class="wrapper">
          <h4>Please wait while we are checking...</h4>
        </div>
      )}
    </div>
  );
}
