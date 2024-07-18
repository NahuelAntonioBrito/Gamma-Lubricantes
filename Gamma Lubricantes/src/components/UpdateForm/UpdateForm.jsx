import React, { useState, useEffect } from "react";
import "./UpdateForm.css";

const UpdateForm = ({ type, data, onUpdate }) => {
  const [formState, setFormState] = useState(data);
  const [carCompatibility, setCarCompatibility] = useState(
    data.carCompatibility || []
  );

  useEffect(() => {
    setFormState(data);
    setCarCompatibility(data.carCompatibility || []);
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleCarCompatibilityChange = (index, e) => {
    const { name, value } = e.target;
    const newCarCompatibility = [...carCompatibility];
    newCarCompatibility[index] = {
      ...newCarCompatibility[index],
      [name]: value,
    };
    setCarCompatibility(newCarCompatibility);
  };

  const addCarCompatibility = () => {
    setCarCompatibility([
      ...carCompatibility,
      { brand: "", model: "", year: "" },
    ]);
  };

  const removeCarCompatibility = (index) => {
    const newCarCompatibility = carCompatibility.filter((_, i) => i !== index);
    setCarCompatibility(newCarCompatibility);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = { ...formState, carCompatibility };
    onUpdate(formState._id, updatedData); // Asegúrate de pasar el _id
  };

  return (
    <div className="update-form-container">
      <h2>
        {type === "product" ? "Actualizar Producto" : "Actualizar Cliente"}
      </h2>
      <form onSubmit={handleSubmit}>
        {type === "product" ? (
          <>
            <input
              type="text"
              name="title"
              value={formState.title || ""}
              onChange={handleChange}
              placeholder="Título"
            />
            <input
              type="number"
              name="liters"
              value={formState.liters || ""}
              onChange={handleChange}
              placeholder="Litros"
            />
            <input
              type="number"
              name="price"
              value={formState.price || ""}
              onChange={handleChange}
              placeholder="Precio"
            />
            <input
              type="text"
              name="thumbnails"
              value={
                formState.thumbnails && formState.thumbnails[0]
                  ? formState.thumbnails[0]
                  : ""
              }
              onChange={(e) =>
                setFormState({
                  ...formState,
                  thumbnails: [e.target.value],
                })
              }
              placeholder="URL de la imagen"
            />
            <input
              type="text"
              name="code"
              value={formState.code || ""}
              onChange={handleChange}
              placeholder="Código"
            />
            <input
              type="number"
              name="stock"
              value={formState.stock || ""}
              onChange={handleChange}
              placeholder="Stock"
            />
            <input
              type="text"
              name="category"
              value={formState.category || ""}
              onChange={handleChange}
              placeholder="Categoría"
            />
            <h3>Compatibilidad de Autos</h3>
            {carCompatibility.map((car, index) => (
              <div key={index} className="car-compatibility-row">
                <input
                  type="text"
                  name="brand"
                  value={car.brand}
                  onChange={(e) => handleCarCompatibilityChange(index, e)}
                  placeholder="Marca"
                />
                <input
                  type="text"
                  name="model"
                  value={car.model}
                  onChange={(e) => handleCarCompatibilityChange(index, e)}
                  placeholder="Modelo"
                />
                <input
                  type="number"
                  name="year"
                  value={car.year}
                  onChange={(e) => handleCarCompatibilityChange(index, e)}
                  placeholder="Año"
                />
                <button
                  type="button"
                  onClick={() => removeCarCompatibility(index)}
                  className="remove-car-compatibility"
                >
                  Eliminar
                </button>
              </div>
            ))}
            <button type="button" onClick={addCarCompatibility}>
              Agregar Auto
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              name="name"
              value={formState.name || ""}
              onChange={handleChange}
              placeholder="Nombre"
            />
            <input
              type="text"
              name="lastName"
              value={formState.lastName || ""}
              onChange={handleChange}
              placeholder="Apellido"
            />
            <input
              type="text"
              name="auto"
              value={formState.auto || ""}
              onChange={handleChange}
              placeholder="Auto"
            />
            <input
              type="text"
              name="patente"
              value={formState.patente || ""}
              onChange={handleChange}
              placeholder="Patente"
            />
            <input
              type="number"
              name="modelo"
              value={formState.modelo || ""}
              onChange={handleChange}
              placeholder="Modelo"
            />
            <input
              type="text"
              name="aceite"
              value={formState.aceite || ""}
              onChange={handleChange}
              placeholder="Aceite"
            />
            <input
              type="text"
              name="celular"
              value={formState.celular || ""}
              onChange={handleChange}
              placeholder="Celular"
            />
            <input
              type="email"
              name="mail"
              value={formState.mail || ""}
              onChange={handleChange}
              placeholder="Email"
            />
          </>
        )}
        <button type="submit">Actualizar</button>
      </form>
    </div>
  );
};

export default UpdateForm;
