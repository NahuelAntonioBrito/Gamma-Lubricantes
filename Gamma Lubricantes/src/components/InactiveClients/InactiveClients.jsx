import React from "react";
import "./InactiveClients.css";

const InactiveClients = ({ clients }) => {
  if (!clients || clients.length === 0) {
    return <p>No hay clientes inactivos</p>;
  }

  return (
    <div className="inactive-clients">
      <ul>
        {clients.map((client) => (
          <li key={client.clientId}>
            <p>
              Nombre: {client.name} {client.lastName}
            </p>
            <p>
              Última revisión:{" "}
              {new Date(client.lastHistory.fecha).toLocaleDateString()}
            </p>
            <p>Descripción: {client.lastHistory.descripcion}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InactiveClients;
