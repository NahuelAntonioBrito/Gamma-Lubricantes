import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import UpdateForm from "../UpdateForm/UpdateForm";
import { products } from "../../api/products";
import { clients } from "../../api/clients";
import SearchBar from "../SearchBar/SearchBar";

const UpdateItem = ({ type }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (type === "product") {
      const productToUpdate = JSON.parse(
        localStorage.getItem("productToUpdate")
      );
      if (productToUpdate) {
        setData(productToUpdate);
        localStorage.removeItem("productToUpdate");
      }
    } else if (type === "client") {
      const clientToUpdate = JSON.parse(localStorage.getItem("clientToUpdate"));
      if (clientToUpdate) {
        setData(clientToUpdate);
        localStorage.removeItem("clientToUpdate");
      }
    }
  }, [type]);

  const handleSelect = (item) => {
    setData(item);
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      if (type === "product") {
        await products.updateProduct(id, updatedData);
        Swal.fire({
          title: "¡Éxito!",
          text: "Producto actualizado con éxito",
          icon: "success",
          confirmButtonText: "Genial",
        });
      } else {
        await clients.updateClient(id, updatedData);
        Swal.fire({
          title: "¡Éxito!",
          text: "Cliente actualizado con éxito",
          icon: "success",
          confirmButtonText: "Genial",
        });
      }
      console.log(
        `${type === "product" ? "Producto" : "Cliente"} actualizado:`,
        updatedData
      );
    } catch (error) {
      console.error("Error updating item: ", error);
      Swal.fire({
        title: "¡Error!",
        text:
          type === "product"
            ? "Error al actualizar el producto"
            : "Error al actualizar el cliente",
        icon: "error",
        confirmButtonText: "Cerrar",
      });
    }
  };

  return (
    <div className="update-item-container">
      <h2>Buscar y Actualizar {type === "product" ? "Producto" : "Cliente"}</h2>
      <SearchBar
        onNavigate={handleSelect}
        placeholder={`Buscar ${
          type === "product" ? "producto" : "cliente"
        } a actualizar`}
        type={type}
      />
      {data && <UpdateForm type={type} data={data} onUpdate={handleUpdate} />}
    </div>
  );
};

export default UpdateItem;
