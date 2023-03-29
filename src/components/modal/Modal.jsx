import { useState } from "react";
import Modal from "react-modal";
import React from "react";
import { Cancel } from "@mui/icons-material";
import { display } from "@mui/system";
import axios from "axios";

function ModalBtn({ title, endpoint, id }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }
  const onSubmit = async () => {
    let tokenStr = "";
    tokenStr = JSON.parse(localStorage.getItem("persist:root")).token;
    // console.log({ token: JSON.parse(await localStorage.getItem("accesstoken")) });
    const accesstoken = tokenStr.replace(/^"(.*)"$/, "$1");
    try {
      const updateUser = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}order/updateStatus`,
        {
          id,
          status: "0",
        },
        {
          headers: {
            authorization: `Bearer ${accesstoken}`,
          },
        }
      );
      console.log(updateUser);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <button className="secondryBtn" onClick={openModal}>
        Cancel Order
      </button>
      <Modal
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            background: "black",
            border: "transparent",
            color: "white",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "20%",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
          },
        }}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
      >
        <div style={{ fontSize: "20px", textAlign: "center" }}>{title}</div>
        <br />
        <p style={{ fontSize: "16px" }}>
          Once your order is cancelled your refund will be credited to your
          account in T+6 days
        </p>
        <br />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button onClick={closeModal}>No</button>
          <button onClick={onSubmit}>Yes</button>
        </div>
      </Modal>
    </div>
  );
}

export default ModalBtn;
