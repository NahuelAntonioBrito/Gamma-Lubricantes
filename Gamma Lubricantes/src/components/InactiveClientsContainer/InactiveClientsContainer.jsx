import React, { useState, useEffect } from "react";
import { clients } from "../../api/clients";
import InactiveClients from "../InactiveClients/InactiveClients";

const InactiveClientsContainer = () => {
  const [inactiveClients, setInactiveClients] = useState([]);
  const [hasViewed, setHasViewed] = useState(false);

  useEffect(() => {
    const fetchInactiveClients = async () => {
      try {
        const response = await clients.getInactive();
        setInactiveClients(response.inactiveClients || []);
        setHasViewed(localStorage.getItem("inactiveClientsViewed") === "true");
      } catch (error) {
        console.error("Error fetching inactive clients:", error);
      }
    };

    fetchInactiveClients();
  }, []);

  useEffect(() => {
    localStorage.setItem("inactiveClientsViewed", hasViewed);
  }, [hasViewed]);

  const handleView = () => {
    setHasViewed(true);
    localStorage.setItem("inactiveClientsViewed", "true");
    localStorage.setItem("lastViewedInactiveClients", new Date().toISOString());
  };

  return (
    <div onClick={handleView}>
      <h2>Clientes que su última revisión fue hace 6 meses o más</h2>
      <InactiveClients clients={inactiveClients} />
    </div>
  );
};

export default InactiveClientsContainer;
