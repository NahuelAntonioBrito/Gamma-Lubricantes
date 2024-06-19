import "./Item.css";

const Item = ({ product }) => {
  return (
    <div className="item-card">
      <img
        src={product.thumbnails[0]}
        alt={product.title}
        className="item-image"
      />
      <h3 className="item-title">{product.title}</h3>
      <p className="item-price">Precio: ${product.price}</p>
      <p className="item-stock">Stock: {product.stock}</p>
    </div>
  );
};

export default Item;
