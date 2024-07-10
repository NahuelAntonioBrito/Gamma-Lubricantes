import React from "react";
import DeleteForm from "../DeleteForm/DeleteForm";
import { products } from "../../api/products";
import { clients } from "../../api/clients";

const DeleteItem = ({ type }) => {
  const handleDelete = async (id) => {
    try {
      if (type === "product") {
        await products.deleteProduct(id);
      } else if (type === "client") {
        await clients.deleteClient(id);
      }
      console.log(
        `${type === "product" ? "Producto" : "Cliente"} eliminado con ID: ${id}`
      );
    } catch (error) {
      console.error("Error eliminando el elemento: ", error);
    }
  };

  return (
    <div className="delete-item-container">
      <DeleteForm type={type} onDelete={handleDelete} />
    </div>
  );
};

export default DeleteItem;
