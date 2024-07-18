import { useState, useEffect } from "react";
import { products } from "../../api/products";
import "./CategoryDropdown.css"; // Asegúrate de que este archivo existe

const CategoryDropdown = ({ onSelectCategory }) => {
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await products.getCategories();
        console.log("categories front: ", response);
        setCategoryList(response);
      } catch (error) {
        console.error("Error fetching categories: ", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    onSelectCategory(category);
  };

  return (
    <div className="category-dropdown-container">
      <label className="category-dropdown-label">
        {selectedCategory
          ? `Categoría: ${selectedCategory}`
          : "Todas las Categorías"}
      </label>
      <select className="category-dropdown" onChange={handleCategoryChange}>
        <option value="">Todas las Categorías</option>
        {categoryList.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryDropdown;
