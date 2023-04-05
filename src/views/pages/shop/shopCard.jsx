import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import PriceCalculator from "src/components/priceCalculator/priceCalculator";

const ProductCard = ({ product }) => {
  console.log(product);
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
      to={`/${product._id}`}
      className="productItemContainer animate hidden"
    >
      <div className="productItemContainerHeader">
        {product.discount &&
        new Date(product.discount?.endDate) > new Date(Date.now()) ? (
          <span class="notify-badge">Sale!</span>
        ) : (
          ""
        )}
        <img className="productImage" src={product.coverImage} />
      </div>
      <div className="productItemContainerFooter">
        <div className="productItemContainerTitle boldName whiteColor">
          {product.title.length > 20
            ? `${product.title.slice(0, 20).toLowerCase()}...`
            : product.title}
        </div>
        <div className="productItemContainerPrice bodyCopy whiteColor">
          {product.discount &&
          new Date(product.discount.endDate) > new Date(Date.now()) ? (
            <div>
              <span className="strikeThrough">
                <PriceCalculator price={product.price} />
              </span>{" "}
              <PriceCalculator price={product.price - product.discount.value} />
            </div>
          ) : (
            <PriceCalculator price={product.price} />
          )}
        </div>
        <div className="btnContainer marginTop">
          <Link to={`/${product._id}`} className="albumBtn">
            View
          </Link>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
