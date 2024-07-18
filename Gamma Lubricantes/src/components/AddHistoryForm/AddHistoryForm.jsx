// src/components/AddHistoryForm/AddHistoryForm.js

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { history } from "../../api/history";
import Swal from "sweetalert2";
import "./AddHistoryForm.css";

const AddHistoryForm = () => {
  const { clientId } = useParams();
  const [description, setDescription] = useState("");
  const [kilometres, setKilometres] = useState("");
  const navigate = useNavigate();
  const today = new Date().toLocaleDateString();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await history.addHistory(clientId, {
        descripcion: description,
        kilometres,
      });
      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "Historial añadido correctamente",
      });
      navigate(`/clients/${clientId}`);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error al añadir el historial",
      });
      console.error("Error adding history: ", error);
    }
  };

  return (
    <div className="add-history-form-container">
      <h2>Añadir Trabajo</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Fecha:</label>
          <input type="text" value={today} disabled />
        </div>
        <div>
          <label>Descripción:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <label>Kilometraje:</label>
          <input
            type="number"
            value={kilometres}
            onChange={(e) => setKilometres(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="add-history-button">
          Añadir
        </button>
      </form>
    </div>
  );
};

export default AddHistoryForm;
