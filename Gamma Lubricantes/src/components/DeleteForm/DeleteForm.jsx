import { useState } from "react";
import Swal from "sweetalert2";
import SearchBar from "../SearchBar/SearchBar";
import "./DeleteForm.css";

const DeleteForm = ({ type, onDelete }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: `¿Deseas eliminar este ${
        type === "product" ? "producto" : "cliente"
      }?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No, cancelar",
    });

    if (result.isConfirmed && selectedItem) {
      onDelete(selectedItem._id);
    }
  };

  const handleNavigate = (item) => {
    setSelectedItem(item);
  };

  return (
    <div className="delete-form-container">
      <h2>Eliminar {type === "product" ? "Producto" : "Cliente"}</h2>
      <SearchBar
        onNavigate={handleNavigate}
        placeholder={type === "product" ? "Buscar producto" : "Buscar cliente"}
        type={type}
      />
      <button
        onClick={handleDelete}
        disabled={!selectedItem}
        className="DeleteButton"
      >
        Eliminar
      </button>
    </div>
  );
};

export default DeleteForm;
