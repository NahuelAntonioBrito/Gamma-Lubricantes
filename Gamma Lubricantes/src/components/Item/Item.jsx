import { Link } from "react-router-dom";
import "./Item.css";

const Item = ({ product }) => {
  return (
    <div className="item-card">
      <div className="item-image-container">
        <img
          src={product.thumbnails[0]}
          alt={product.title}
          className="item-image"
        />
      </div>
      <h3 className="item-title">{product.title}</h3>
      <p className="item-price">Precio: ${product.price}</p>
      <p className="item-stock">Stock: {product.stock}</p>
      <button type="button" className="btn btn-primary">
        <Link to={`/product/${product._id}`} className="buttonDetail">
          Detalle
        </Link>
      </button>
    </div>
  );
};

export default Item;
