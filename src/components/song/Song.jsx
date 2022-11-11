import { CButton } from "@coreui/react";
import React, { useState } from "react";
import "./song.scss";

const songs = [
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
export default function Song() {
  const [limit, setLimit] = useState(4);
  return (
    <div className="songBox">
      {songs?.map((e, i) =>
        i < limit && i < songs.length ? (
          <div
            key={e.id}
            style={{
              backgroundImage: `url("../../Screenshot (48).png")`,
              backgroundSize: "cover",
              display: "flex",
              height: "300px",
            }}
            className="song"
          >
            <h3 className="boldName">{e.name}</h3>
            <CButton className="albumBtn secondryBtn">GET IT NOW</CButton>
          </div>
        ) : (
          ""
        )
      )}
      <CButton
        onClick={() => setLimit((oldLimit) => oldLimit + 2)}
        style={{ marginTop: "1.2rem" }}
        className="secondryBtn"
      >
        VIEW MORE
      </CButton>
    </div>
  );
}
