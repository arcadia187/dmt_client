import { CButton } from "@coreui/react";
import React from "react";
import { useState } from "react";
import "./shop.scss";
const products = [
  {
    id: 1,
    name: "illegal experiment",
  },
  {
    id: 2,
    name: "badland",
  },
  {
    id: 3,
    name: "karma incoming",
  },
  {
    id: 4,
    name: "medicinal conciousness",
  },
  {
    id: 5,
    name: "badland",
  },
  {
    id: 6,
    name: "Karma incoming",
  },
  {
    id: 7,
    name: "illegal experiment",
  },
  {
    id: 8,
    name: "karma incoming",
  },
];
export default function Shop() {
  const [limit, setLimit] = useState(3);
  return (
    <>
      <div className="shopBox">
        {products?.map((e, i) =>
          i < limit && i < products.length ? (
            <div
              key={e.id}
              style={{
                display: "flex",
                height: "370px",
                justifyContent: "center",
                alignItems: "center",
              }}
              className="shop"
            >
              <img
                src="../../Screenshot (48).png"
                // height="200px"
                width="100%"
                alt=""
              />
              <div
                style={{ width: "100%", height: "80px", marginTop: "0.25rem" }}
              >
                <h3
                  style={{
                    fontSize: "20px",
                    marginTop: "0.5rem",
                    textAlign: "center",
                    textTransform: "uppercase",
                  }}
                  className="productName"
                >
                  {e.name}
                </h3>
                <CButton className="albumBtn secondryBtn">ADD TO CART</CButton>
              </div>
            </div>
          ) : (
            ""
          )
        )}
      </div>
      <CButton
        onClick={() => setLimit((oldLimit) => oldLimit + 3)}
        style={{ marginTop: "1.2rem" }}
        className="secondryBtn"
      >
        VIEW MORE
      </CButton>
    </>
  );
}
