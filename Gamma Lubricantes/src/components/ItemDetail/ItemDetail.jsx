import React from "react";
import "./ItemDetail.css";

const ItemDetail = ({ product }) => {
  return (
    <div className="item-detail">
      <h2 className="item-detail-title">{product.title}</h2>
      <img
        className="item-detail-image"
        src={product.thumbnails[0]}
        alt={product.title}
      />
      <p className="item-detail-price">Precio: ${product.price}</p>
      <p className="item-detail-stock">Stock: {product.stock}</p>
      <p className="item-detail-code">Código: {product.code}</p>
    </div>
  );
};

export default ItemDetail;
