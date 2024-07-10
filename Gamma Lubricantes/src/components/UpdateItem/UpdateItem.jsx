import { useState } from "react";
import UpdateForm from "../UpdateForm/UpdateForm";
import { products } from "../../api/products";
import { clients } from "../../api/clients";
import SearchBar from "../SearchBar/SearchBar";

const UpdateItem = ({ type }) => {
  const [data, setData] = useState(null);

  const handleSelect = (item) => {
    setData(item);
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      if (type === "product") {
        await products.updateProduct(id, updatedData);
      } else {
        await clients.updateClient(id, updatedData);
      }
      console.log(
        `${type === "product" ? "Producto" : "Cliente"} actualizado:`,
        updatedData
      );
    } catch (error) {
      console.error("Error updating item: ", error);
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
