import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const ArtistCard = ({ artist }) => {
  console.log(artist);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          entry.target.classList.remove("hidden");
        } else {
          entry.target.classList.remove("show");
          entry.target.classList.add("hidden");
        }
      });
    });

    const hiddenElements = document.querySelectorAll(".animate");
    console.log(hiddenElements);
    hiddenElements.forEach((el) => observer.observe(el));
  });
  return (
    <Link
      to="#"
      className="productItemContainer animate hidden"
    >
      <div className="productItemContainerHeader">
        <img className="productImage" src={artist.image} />
      </div>
      <div className="productItemContainerFooter">
        <div className="productItemContainerTitle boldName whiteColor">
          {artist.name.length > 20
            ? `${artist.name.slice(0, 20).toLowerCase()}...`
            : artist.name}
        </div>
        <div className="productItemContainerPrice bodyCopy whiteColor">
    
        </div>
        {/* <div className="btnContainer marginTop">
          <Link to="#" className="albumBtn">
            View
          </Link>
        </div> */}
      </div>
    </Link>
  );
};

export default ArtistCard;
