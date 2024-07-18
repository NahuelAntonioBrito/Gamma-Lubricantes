import React from "react";
import { useNavigate } from "react-router-dom";
import "./ItemDetail.css";

const ItemDetail = ({ product }) => {
  const navigate = useNavigate();

  const handleEditClick = () => {
    localStorage.setItem("productToUpdate", JSON.stringify(product));
    navigate("/update-product");
  };

  return (
    <div className="item-detail">
      <div className="item-detail-container">
        <div className="item-detail-image-container">
          <img
            className="item-detail-image"
            src={product.thumbnails[0]}
            alt={product.title}
          />
        </div>
        <div className="item-detail-info">
          <div className="item-detail-header">
            <h2 className="item-detail-title">{product.title}</h2>
            <button onClick={handleEditClick} className="edit-button">
              <i className="bi bi-pencil-square"></i>
            </button>
          </div>
          <p className="item-detail-text">Litros: {product.liters}</p>
          <p className="item-detail-text">Precio: ${product.price}</p>
          <p className="item-detail-text">Código: {product.code}</p>
          <p className="item-detail-text">Stock: {product.stock}</p>
          <p className="item-detail-text">Categoría: {product.category}</p>
        </div>
      </div>
      {product.carCompatibility && product.carCompatibility.length > 0 && (
        <div className="item-detail-table-container">
          <h3 className="item-detail-table-title">
            Autos que llevan este aceite
          </h3>
          <table className="item-detail-table">
            <thead>
              <tr>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Año</th>
              </tr>
            </thead>
            <tbody>
              {product.carCompatibility.map((car) => (
                <tr key={car._id}>
                  <td>{car.brand}</td>
                  <td>{car.model}</td>
                  <td>{car.year}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ItemDetail;
