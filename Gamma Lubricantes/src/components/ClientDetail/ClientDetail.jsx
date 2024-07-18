import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { clients } from "../../api/clients";
import { history } from "../../api/history";
import trash from "../../../public/img/trash.png";
import "./ClientDetail.css";

const ClientDetail = () => {
  const { clientId } = useParams();
  const [client, setClient] = useState(null);
  const navigate = useNavigate();

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

  const handleEditClick = () => {
    localStorage.setItem("clientToUpdate", JSON.stringify(client));
    navigate("/update-client");
  };

  const handleAddHistoryClick = () => {
    navigate(`/add-history/${clientId}`);
  };

  const handleDeleteHistoryClick = async (historyId) => {
    try {
      await history.deleteHistory(historyId, clientId);
      setClient((prevClient) => ({
        ...prevClient,
        history: prevClient.history.filter((item) => item._id !== historyId),
      }));
    } catch (error) {
      console.error("Error deleting history: ", error);
    }
  };

  return (
    <div className="client-detail">
      {client ? (
        <>
          <div className="client-detail-header">
            <h2>
              {client.name} {client.lastName}
            </h2>
            <button onClick={handleEditClick} className="edit-button">
              <i className="bi bi-pencil-square"></i>
            </button>
          </div>
          <p>Auto: {client.auto}</p>
          <p>Patente: {client.patente}</p>
          <p>Modelo: {client.modelo}</p>
          <p>Aceite: {client.aceite}</p>
          <p>Celular: {client.celular}</p>
          <p>Email: {client.mail}</p>
          <div className="client-history-header">
            <h3>Historial de Trabajos</h3>
            <button
              onClick={handleAddHistoryClick}
              className="add-history-button"
            >
              Añadir trabajo
            </button>
          </div>
          <table className="history-table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Descripción</th>
                <th>Kilometraje</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {client.history.map((item) => (
                <tr key={item._id}>
                  <td>{new Date(item.fecha).toLocaleDateString()}</td>
                  <td>{item.descripcion}</td>
                  <td>{item.kilometres}</td>
                  <td>
                    <button
                      onClick={() => handleDeleteHistoryClick(item._id)}
                      className="delete-history-button"
                    >
                      <img src={trash} alt="Eliminar" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ClientDetail;
