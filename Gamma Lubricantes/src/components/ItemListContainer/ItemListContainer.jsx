import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ItemList from "../ItemlList/ItemList";
import CategoryDropdown from "../CategoryDropdown/CategoryDropdown";
import Pagination from "../Pagination/Pagination";
import { products } from "../../api/products";
import "./ItemListContainer.css";

const ItemListContainer = () => {
  const { categoryId } = useParams();
  const [productList, setProductList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async (page) => {
      try {
        let response;
        if (categoryId) {
          response = await products.getByCategory(categoryId, page);
        } else {
          response = await products.getPaginated(page);
        }
        setProductList(response.products);
        setTotalPages(response.totalPages);
      } catch (error) {
        console.error("Error fetching products: ", error);
        setProductList([]);
      }
    };

    fetchProducts(currentPage);
  }, [categoryId, currentPage]);

  const handleCategorySelect = (category) => {
    setCurrentPage(1);
    if (category) {
      navigate(`/category/${category}`);
    } else {
      navigate("/products");
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="item-list-container">
      <h2>Productos</h2>
      <CategoryDropdown onSelectCategory={handleCategorySelect} />
      <ItemList products={productList} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ItemListContainer;
