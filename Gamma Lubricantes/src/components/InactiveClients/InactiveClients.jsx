import React from "react";
import { Link } from "react-router-dom";
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
            {client.lastHistory ? (
              <>
                <p>
                  Última revisión:{" "}
                  {new Date(client.lastHistory.fecha).toLocaleDateString()}
                </p>
                <p>Kilometraje: {client.lastHistory.kilometres}</p>
                <p>Descripción: {client.lastHistory.descripcion}</p>
              </>
            ) : (
              <p>No hay historial disponible</p>
            )}
            <button className="inactiveClientDetail">
              <Link to={`/clients/${client.clientId}`}>
                Detalle del cliente
              </Link>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InactiveClients;
