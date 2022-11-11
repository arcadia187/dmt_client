import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="productItemContainer">
      <div className="productItemContainerHeader">
        {product.discount &&
        new Date(product.discount.endDate) > new Date(Date.now()) ? (
          <span class="notify-badge">Sale!</span>
        ) : (
          ""
        )}
        <img className="productImage" src={product.coverImage} />
      </div>
      <div className="productItemContainerFooter">
        <div className="productItemContainerTitle bodyCopy whiteColor">
          {product.title.length > 20
            ? `${product.title.slice(0, 20)}...`
            : product.title}
        </div>
        <div className="productItemContainerPrice bodyCopy whiteColor">
          {product.discount &&
          new Date(product.discount.endDate) > new Date(Date.now()) ? (
            <div>
              <span className="strikeThrough">{product.price}</span>{" "}
              {product.price - product.discount.value}
            </div>
          ) : (
            product.price
          )}
        </div>
        <div className="btnContainer">
          <button className="albumBtn">Add to cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
