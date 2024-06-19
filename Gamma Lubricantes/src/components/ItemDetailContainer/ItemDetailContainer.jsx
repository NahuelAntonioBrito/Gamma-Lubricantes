import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { products } from "../../../public/products";
import ItemDetail from "../ItemDetail/ItemDetail";
import "./ItemDetailContainer.css";

const getProductById = (prodId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products.find((prod) => prod.code === prodId));
    }, 500);
  });
};

const ItemDetailContainer = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProductById(productId)
      .then((response) => {
        setProduct(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [productId]);

  return (
    <div className="item-detail-container">
      {product ? <ItemDetail product={product} /> : <p>Loading...</p>}
    </div>
  );
};

export default ItemDetailContainer;
