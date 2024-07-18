import { useState, useEffect } from "react";
import "./CarCompatibilityForm.css";

const CarCompatibilityForm = ({ compatibility, onChange }) => {
  const [carCompatibility, setCarCompatibility] = useState(compatibility || []);

  useEffect(() => {
    setCarCompatibility(compatibility || []);
  }, [compatibility]);

  const handleAddCar = () => {
    const newCar = { brand: "", model: "", year: "" };
    const newCompatibility = [...carCompatibility, newCar];
    setCarCompatibility(newCompatibility);
    onChange(newCompatibility);
  };

  const handleRemoveCar = (index) => {
    const newCompatibility = carCompatibility.filter((_, i) => i !== index);
    setCarCompatibility(newCompatibility);
    onChange(newCompatibility);
  };

  const handleChangeCar = (index, field, value) => {
    const newCompatibility = carCompatibility.map((car, i) =>
      i === index ? { ...car, [field]: value } : car
    );
    setCarCompatibility(newCompatibility);
    onChange(newCompatibility);
  };

  return (
    <div className="car-compatibility-form">
      <h3>Compatibilidad de Autos</h3>
      {carCompatibility.map((car, index) => (
        <div key={index} className="car-compatibility-entry">
          <input
            type="text"
            placeholder="Marca"
            value={car.brand}
            onChange={(e) => handleChangeCar(index, "brand", e.target.value)}
          />
          <input
            type="text"
            placeholder="Modelo"
            value={car.model}
            onChange={(e) => handleChangeCar(index, "model", e.target.value)}
          />
          <input
            type="number"
            placeholder="Año"
            value={car.year}
            onChange={(e) => handleChangeCar(index, "year", e.target.value)}
          />
          <button type="button" onClick={() => handleRemoveCar(index)}>
            Eliminar
          </button>
        </div>
      ))}
      <button className="addCarButto" type="button" onClick={handleAddCar}>
        Agregar Auto
      </button>
    </div>
  );
};

export default CarCompatibilityForm;
