import { CButton } from "@coreui/react";
import React, { useEffect } from "react";
import "./album.scss";
import axios from "axios";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

function Album({ albums }) {
  const [album, setAlbum] = useState(null);
  const fetchData = async () => {
    try {
      //   const { data } = await axios.get(
      //     `${process.env.REACT_APP_SERVER_URL}/product/get_releases`
      //   );
      setAlbum(albums[0]);

      // console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!album) {
    return <CircularProgress />;
  }

  return (
    <div
      className="album"
      style={{
        backgroundImage: `url(${album.coverImage})`,
        backgroundSize: "cover",
      }}
    >
      <div className="trackCredit blackColorLayer">
        <h3 className="boldName creditName">{album.title}</h3>
        {album.compiledBy ? (
          <p className="credit">compiled by DAVER DEMON</p>
        ) : null}
        <p className="credit">{album.description}</p>
        <Link to={`/${album._id}`} style={{marginBottom:"1.2rem"}} className="albumBtn secondryBtn">
          GET IT NOW
        </Link>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    albums: state.albums,
  };
};
export default connect(mapStateToProps)(Album);
