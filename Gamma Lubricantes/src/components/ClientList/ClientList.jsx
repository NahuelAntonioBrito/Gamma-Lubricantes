import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { clients } from "../../api/clients";
import "./ClientList.css";

const ClientList = () => {
  const [clientList, setClientList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await clients.getAll();
        setClientList(response.clients);
      } catch (error) {
        console.error("Error fetching clients: ", error);
      }
    };

    fetchClients();
  }, []);

  const handleSelectClient = (clientId) => {
    navigate(`/clients/${clientId}`);
  };

  return (
    <div className="client-list-container">
      <div className="client-list">
        <h2>Clientes</h2>
        <ul>
          {clientList.map((client) => (
            <li key={client._id} onClick={() => handleSelectClient(client._id)}>
              {client.name} {client.lastName}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ClientList;
