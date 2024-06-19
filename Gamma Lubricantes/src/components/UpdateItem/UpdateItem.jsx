import React, { useState } from "react";
import UpdateForm from "../UpdateForm/UpdateForm";
import { clients } from "../../../public/clients";
import { products } from "../../../public/products";

const UpdateItem = ({ type }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState(null);

  const handleSearch = () => {
    if (type === "product") {
      const product = products.find(
        (prod) => prod.id === parseInt(searchTerm, 10)
      );
      setData(product || {});
    } else if (type === "client") {
      const client = clients.find(
        (client) => client.name.toLowerCase() === searchTerm.toLowerCase()
      );
      setData(client || {});
    }
  };

  const handleUpdate = (updatedData) => {
    if (type === "product") {
      const index = products.findIndex((prod) => prod.id === updatedData.id);
      products[index] = updatedData;
    } else if (type === "client") {
      const index = clients.findIndex((client) => client.id === updatedData.id);
      clients[index] = updatedData;
    }
    console.log(
      `${type === "product" ? "Producto" : "Cliente"} actualizado:`,
      updatedData
    );
  };

  return (
    <div className="update-item-container">
      <h2>Buscar y Actualizar {type === "product" ? "Producto" : "Cliente"}</h2>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={
          type === "product"
            ? "Buscar por ID de Producto"
            : "Buscar por Nombre de Cliente"
        }
      />
      <button onClick={handleSearch}>Buscar</button>
      {data && <UpdateForm type={type} data={data} onUpdate={handleUpdate} />}
    </div>
  );
};

export default UpdateItem;
