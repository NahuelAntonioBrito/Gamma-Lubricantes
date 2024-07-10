import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ItemDetail from "../ItemDetail/ItemDetail";
import { products } from "../../api/products";
import "./ItemDetailContainer.css";

const ItemDetailContainer = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await products.getById(productId);
        setProduct(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [productId]);

  return (
    <div className="item-detail-container">
      {product ? <ItemDetail product={product} /> : <p>Loading...</p>}
    </div>
  );
};

export default ItemDetailContainer;
