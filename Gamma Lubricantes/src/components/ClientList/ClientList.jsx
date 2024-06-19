import React, { useState } from "react";
import { clients } from "../../../public/clients";
import ClientDetail from "../ClientDetail/ClientDetail";
import "./ClientList.css";

const ClientList = () => {
  const [selectedClient, setSelectedClient] = useState(null);

  const handleSelectClient = (client) => {
    setSelectedClient(client);
  };

  return (
    <div className="client-list-container">
      <div className="client-list">
        <h2>Clientes</h2>
        <ul>
          {clients.map((client) => (
            <li key={client.id} onClick={() => handleSelectClient(client)}>
              {client.name} {client.lastName}
            </li>
          ))}
        </ul>
      </div>
      <div className="client-detail-container">
        {selectedClient && <ClientDetail client={selectedClient} />}
      </div>
    </div>
  );
};

export default ClientList;
