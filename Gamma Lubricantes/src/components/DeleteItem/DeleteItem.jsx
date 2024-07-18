import React from "react";
import Swal from "sweetalert2";
import DeleteForm from "../DeleteForm/DeleteForm";
import { products } from "../../api/products";
import { clients } from "../../api/clients";

const DeleteItem = ({ type }) => {
  const handleDelete = async (id) => {
    try {
      if (type === "product") {
        await products.deleteProduct(id);
        Swal.fire({
          title: "¡Eliminado!",
          text: "Producto eliminado con éxito",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
      } else if (type === "client") {
        await clients.deleteClient(id);
        Swal.fire({
          title: "¡Eliminado!",
          text: "Cliente eliminado con éxito",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
      }
      console.log(
        `${type === "product" ? "Producto" : "Cliente"} eliminado con ID: ${id}`
      );
    } catch (error) {
      console.error("Error eliminando el elemento: ", error);
      Swal.fire({
        title: "¡Error!",
        text: `Error al eliminar el ${
          type === "product" ? "producto" : "cliente"
        }`,
        icon: "error",
        confirmButtonText: "Cerrar",
      });
    }
  };

  return (
    <div className="delete-item-container">
      <DeleteForm type={type} onDelete={handleDelete} />
    </div>
  );
};

export default DeleteItem;
