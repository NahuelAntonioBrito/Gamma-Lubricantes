import Item from "../Item/Item";
import "./ItemList.css";

const ItemList = ({ products }) => {
  console.log("Products in ItemList:", products);

  if (!products || products.length === 0) {
    return <p>No products available</p>;
  }

  return (
    <div className="item-list">
      {products.map((product) => (
        <Item key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ItemList;
