import React, { useState, useEffect } from "react";
import { clients } from "../../api/clients";
import ClientDetail from "../ClientDetail/ClientDetail";
import "./ClientList.css";

const ClientList = () => {
  const [clientList, setClientList] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await clients.getAll();
        setClientList(response.clients); // Asegúrate de que el backend devuelve los datos en esta estructura
      } catch (error) {
        console.error("Error fetching clients: ", error);
      }
    };

    fetchClients();
  }, []);

  const handleSelectClient = (client) => {
    setSelectedClient(client);
  };

  return (
    <div className="client-list-container">
      <div className="client-list">
        <h2>Clientes</h2>
        <ul>
          {clientList.map((client) => (
            <li key={client._id} onClick={() => handleSelectClient(client)}>
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
