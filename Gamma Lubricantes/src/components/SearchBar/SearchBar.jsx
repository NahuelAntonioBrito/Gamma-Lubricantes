import { useState, useEffect } from "react";
import { products } from "../../api/products";
import { clients } from "../../api/clients";
import "./SearchBar.css";

const SearchBar = ({ onNavigate, placeholder, type }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (searchTerm.length > 0) {
      const fetchSuggestions = async () => {
        try {
          let productSuggestions = [];
          let clientSuggestions = [];

          if (type === "product") {
            productSuggestions = await products.getByName(searchTerm);
          } else if (type === "client") {
            clientSuggestions = await clients.getByName(searchTerm);
          } else {
            productSuggestions = await products.getByName(searchTerm);
            clientSuggestions = await clients.getByName(searchTerm);
          }

          setSuggestions([...productSuggestions, ...clientSuggestions]);
        } catch (error) {
          console.error("Error fetching suggestions: ", error);
        }
      };
      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [searchTerm, type]);

  const handleSelect = (item) => {
    onNavigate(item);
    setSearchTerm("");
    setSuggestions([]);
  };

  const handleSearch = () => {
    if (suggestions.length > 0) {
      handleSelect(suggestions[0]);
    }
  };

  return (
    <div className="search-bar input-group">
      <input
        type="text"
        className="form-control"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={placeholder || "Buscar"}
        aria-label="Search"
      />
      <button
        className="btn btn-outline-success"
        type="button"
        onClick={handleSearch}
      >
        Buscar
      </button>
      {suggestions.length > 0 && (
        <ul className="list-group suggestions">
          {suggestions.map((item) => (
            <li
              key={item._id}
              className="list-group-item list-group-item-action"
              onClick={() => handleSelect(item)}
            >
              {item.title || `${item.name} ${item.lastName}`}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
