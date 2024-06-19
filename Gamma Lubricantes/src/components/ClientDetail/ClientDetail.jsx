import React from "react";
import "./ClientDetail.css";

const ClientDetail = ({ client }) => {
  return (
    <div className="client-detail">
      <h2>
        {client.name} {client.lastName}
      </h2>
      <p>Auto: {client.auto}</p>
      <p>Patente: {client.patente}</p>
      <p>Modelo: {client.modelo}</p>
      <p>Aceite: {client.aceite}</p>
      <p>Celular: {client.celular}</p>
      <p>Email: {client.mail}</p>
      <h3>Historial de Trabajos</h3>
      <ul>
        {client.historial.map((item, index) => (
          <li key={index}>
            <strong>{item.fecha}</strong>: {item.descripcion}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientDetail;
