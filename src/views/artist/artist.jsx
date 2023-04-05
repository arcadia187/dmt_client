import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./artist.scss";
import { server_url } from "src/constants/variables";
import ArtistCard from "./artistCard";
import { CircularProgress } from "@mui/material";

const Artist = ({ token, user, dispatch }) => {
  const [artists, setArtists] = useState(null);
  const fetchArtists = async () => {
    try {
      const data = await axios.get(server_url + "/artist");
      console.log(data.data.data);
      setArtists(data.data.data);
    } catch (e) {
      console.log(e);
    }
  };
  const renderCards = () => {
    if (!artists) {
      return <CircularProgress />;
    }

    return artists.map((el) => {
      return <ArtistCard artist={el} key={el._id} />;
    });
  };
  useEffect(() => {
    fetchArtists();
  }, []);
  return (
    <div>
      <div className="shop">
        <div className="shopHeroContainer">
          <h1 className="heading">Artists</h1>
        </div>
        <div className="mainProductContainer">
          <div className="productContainer">{renderCards()}</div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.token,
    user: state.uservalue,
  };
};
export default connect(mapStateToProps)(Artist);
