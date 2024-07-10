import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ItemList from "../ItemlList/ItemList";
import { products } from "../../api/products";
import "./ItemListContainer.css";

const ItemListContainer = () => {
  const { categoryId } = useParams();
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let response;
        if (categoryId) {
          console.log("Category ID:", categoryId);
          response = await products.getByCategory(categoryId);
          console.log("Response by category:", response);
        } else {
          response = await products.getAll();
          console.log("Response all products:", response);
        }
        setProductList(Array.isArray(response) ? response : []);
      } catch (error) {
        console.error("Error fetching products: ", error);
        setProductList([]);
      }
    };

    fetchProducts();
  }, [categoryId]);

  useEffect(() => {
    console.log("Product List in State:", productList);
  }, [productList]);

  return (
    <div className="item-list-container">
      <h2>Productos</h2>
      <ItemList products={productList} />
    </div>
  );
};

export default ItemListContainer;
