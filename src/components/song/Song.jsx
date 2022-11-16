import { CButton } from "@coreui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { server_url } from "src/constants/variables";
import "./song.scss";

export default function Song() {
  const [limit, setLimit] = useState(4);
  const [songs, setSongs] = useState([]);
  const fetchSongs = async () => {
    try {
      const songData = await axios.get(server_url + "product/albums?limit=8");

      if (!songData.data.success) return;
      console.log(songData.data.data);
      setSongs(songData.data.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchSongs();
  }, []);

  console.log(songs);
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
            <h3 className="boldName">{e.title}</h3>
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
