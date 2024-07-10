import React, { useState, useEffect } from "react";
import { clients } from "../../api/clients";
import InactiveClients from "../InactiveClients/InactiveClients";

const InactiveClientsContainer = () => {
  const [inactiveClients, setInactiveClients] = useState([]);

  useEffect(() => {
    const fetchInactiveClients = async () => {
      try {
        const response = await clients.getInactive();
        setInactiveClients(response.inactiveClients || []);
      } catch (error) {
        console.error("Error fetching inactive clients:", error);
      }
    };

    fetchInactiveClients();
  }, []);

  return (
    <div>
      <h2>Clientes que su última revisión fue hace 6 meses o más</h2>
      <InactiveClients clients={inactiveClients} />
    </div>
  );
};

export default InactiveClientsContainer;
