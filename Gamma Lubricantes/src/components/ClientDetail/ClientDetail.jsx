import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { clients } from "../../api/clients";
import "./ClientDetail.css";

const ClientDetail = () => {
  const { clientId } = useParams();
  const [client, setClient] = useState(null);

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const response = await clients.getById(clientId);
        setClient(response);
      } catch (error) {
        console.error("Error fetching client: ", error);
      }
    };

    fetchClient();
  }, [clientId]);

  return (
    <div className="client-detail">
      {client ? (
        <>
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
            {client.history.map((item, index) => (
              <li key={index}>
                <strong>{item.fecha}</strong>: {item.descripcion}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ClientDetail;
