import { useState } from "react";
import "./DeleteForm.css";

const DeleteForm = ({ type, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = async () => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este elemento?")) {
      onDelete(searchTerm);
    }
  };

  return (
    <div className="delete-form-container">
      <h2>Eliminar {type === "product" ? "Producto" : "Cliente"}</h2>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={
          type === "product"
            ? "Buscar por ID de Producto"
            : "Buscar por ID de Cliente"
        }
      />
      <button onClick={handleDelete}>Eliminar</button>
    </div>
  );
};

export default DeleteForm;
