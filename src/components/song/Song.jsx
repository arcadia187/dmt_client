import { CButton } from "@coreui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { server_url } from "src/constants/variables";
import "./song.scss";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

function Song({ albums }) {
  const [limit, setLimit] = useState(4);
  const [songs, setSongs] = useState([]);
  const fetchSongs = async () => {
    try {
      // const songData = await axios.get(server_url + "product/albums?limit=8");

      // if (!songData.data.success) return;
      setSongs(albums);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchSongs();
  }, []);
  return (
    <div className="songBox">
      {songs?.map((e, i) =>
        i < limit && i < songs.length ? (
          <div
            key={e.id}
            style={{
              backgroundImage: `url(${e.coverImage})`,
              backgroundSize: "cover",
              display: "flex",
              height: "300px",
            }}
            className="song"
          >
            <h3 className="boldName t1">{e.title}</h3>
            <Link to={`/${e._id}`} className="albumBtn t2">
              GET IT NOW
            </Link>
          </div>
        ) : (
          ""
        )
      )}
      <Link
        to={`/new_releases`}
        onClick={() => setLimit((oldLimit) => oldLimit + 2)}
        style={{ marginTop: "1.2rem" }}
        className="secondryBtn"
      >
        Visit Store
      </Link>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    albums: state.albums,
  };
};
export default connect(mapStateToProps)(Song);
