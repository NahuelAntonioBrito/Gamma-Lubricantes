import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { clients } from "../../api/clients";
import "./NotificationBell.css";

const NotificationBell = () => {
  const [hasUnseenInactiveClients, setHasUnseenInactiveClients] =
    useState(false);

  useEffect(() => {
    console.log("useEffect triggered");
    const checkInactiveClients = async () => {
      console.log("checkInactiveClients called");
      try {
        const data = await clients.getLastUpdate();
        console.log("Data fetched:", data);

        const lastUpdated = new Date(data[0].lastUpdated);
        console.log("Raw lastUpdated:", data[0].lastUpdated);
        console.log("Last Updated:", lastUpdated);

        const lastViewedString = localStorage.getItem(
          "lastViewedInactiveClients"
        );
        const lastViewed = lastViewedString
          ? new Date(lastViewedString)
          : new Date(0);
        console.log("Last Viewed:", lastViewed);

        if (lastUpdated > lastViewed) {
          console.log("There are unseen inactive clients");
          setHasUnseenInactiveClients(true);
        } else {
          console.log("No unseen inactive clients");
        }
      } catch (error) {
        console.error("Error fetching inactive clients:", error);
      }
    };

    checkInactiveClients();
    const interval = setInterval(checkInactiveClients, 24 * 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const handleBellClick = () => {
    setHasUnseenInactiveClients(false);
    localStorage.setItem("lastViewedInactiveClients", new Date().toISOString());
  };

  return (
    <li className="nav-item-bell">
      <Link
        to="/inactive-clients"
        className="nav-link"
        onClick={handleBellClick}
      >
        <i
          className={`bi bi-bell${
            hasUnseenInactiveClients ? " text-danger animate-shake" : ""
          }`}
        ></i>
      </Link>
    </li>
  );
};

export default NotificationBell;
