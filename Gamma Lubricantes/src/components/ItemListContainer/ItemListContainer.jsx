import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ItemList from "../ItemlList/ItemList";
import { products } from "../../../public/products";
import "./ItemListContainer.css";

const getProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products);
    }, 500);
  });
};

const getProductsByCategory = (category) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        products.filter(
          (prod) => category.toLowerCase() === prod.category.toLowerCase()
        )
      );
    }, 500);
  });
};

const ItemListContainer = () => {
  const { categoryId } = useParams();
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const asyncFunc = categoryId ? getProductsByCategory : getProducts;
    asyncFunc(categoryId)
      .then((response) => {
        setProductList(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [categoryId]);

  return (
    <div className="item-list-container">
      <h2>Productos</h2>
      <ItemList products={productList} />
    </div>
  );
};

export default ItemListContainer;
