import { useState } from "react";
import Swal from "sweetalert2";
import { products } from "../../api/products";
import { clients } from "../../api/clients";
import CarCompatibilityForm from "../CarCompatibilityForm/CarCompatibilityForm";
import "./AddForm.css";
//import "../CarCompatibilityForm/CarCompatibilityForm.css";

const AddForm = ({ type }) => {
  const initialProductState = {
    id: "",
    title: "",
    liters: "",
    price: "",
    thumbnails: [""],
    status: true,
    code: "",
    stock: "",
    category: "",
    carCompatibility: [],
  };

  const initialClientState = {
    id: "",
    name: "",
    lastName: "",
    auto: "",
    patente: "",
    modelo: "",
    aceite: "",
    celular: "",
    mail: "",
    historial: [],
  };

  const [formState, setFormState] = useState(
    type === "product" ? initialProductState : initialClientState
  );

  const [showCarCompatibilityForm, setShowCarCompatibilityForm] =
    useState(false);
  const [carCompatibilityAdded, setCarCompatibilityAdded] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleCarCompatibilityChange = (compatibility) => {
    setFormState({
      ...formState,
      carCompatibility: compatibility,
    });
    setCarCompatibilityAdded(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      type === "product" &&
      formState.category.toLowerCase() === "aceite" &&
      !carCompatibilityAdded
    ) {
      const result = await Swal.fire({
        title: "¿Quieres agregar autos compatibles?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Sí",
        cancelButtonText: "No",
      });

      if (result.isConfirmed) {
        setShowCarCompatibilityForm(true);
        return;
      } else {
        formState.carCompatibility = [];
      }
    }

    try {
      if (type === "product") {
        await products.addProduct(formState);
        Swal.fire({
          title: "¡Éxito!",
          text: "Producto agregado con éxito",
          icon: "success",
          confirmButtonText: "Genial",
        });
      } else {
        await clients.addClient(formState);
        Swal.fire({
          title: "¡Éxito!",
          text: "Cliente agregado con éxito",
          icon: "success",
          confirmButtonText: "Genial",
        });
      }
      setFormState(
        type === "product" ? initialProductState : initialClientState
      );
      setShowCarCompatibilityForm(false); // Ocultar el componente CarCompatibilityForm
      setCarCompatibilityAdded(false); // Resetear el estado de carCompatibilityAdded
    } catch (error) {
      console.error("Error adding item: ", error);
      Swal.fire({
        title: "¡Error!",
        text:
          type === "product"
            ? "Error al agregar el producto"
            : "Error al agregar el cliente",
        icon: "error",
        confirmButtonText: "Cerrar",
      });
    }
  };

  return (
    <div className="add-form-container">
      <h2>{type === "product" ? "Agregar Producto" : "Agregar Cliente"}</h2>
      <form onSubmit={handleSubmit}>
        {type === "product" ? (
          <>
            <input
              type="text"
              name="title"
              value={formState.title}
              onChange={handleChange}
              placeholder="Título"
            />
            <input
              type="number"
              name="liters"
              value={formState.liters}
              onChange={handleChange}
              placeholder="Litros"
            />
            <input
              type="number"
              name="price"
              value={formState.price}
              onChange={handleChange}
              placeholder="Precio"
            />
            <input
              type="text"
              name="thumbnails"
              value={formState.thumbnails[0]}
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
              value={formState.code}
              onChange={handleChange}
              placeholder="Código"
            />
            <input
              type="number"
              name="stock"
              value={formState.stock}
              onChange={handleChange}
              placeholder="Stock"
            />
            <input
              type="text"
              name="category"
              value={formState.category}
              onChange={handleChange}
              placeholder="Categoría"
            />
            {showCarCompatibilityForm && (
              <CarCompatibilityForm
                compatibility={formState.carCompatibility}
                onChange={handleCarCompatibilityChange}
              />
            )}
          </>
        ) : (
          <>
            <input
              type="text"
              name="name"
              value={formState.name}
              onChange={handleChange}
              placeholder="Nombre"
            />
            <input
              type="text"
              name="lastName"
              value={formState.lastName}
              onChange={handleChange}
              placeholder="Apellido"
            />
            <input
              type="text"
              name="auto"
              value={formState.auto}
              onChange={handleChange}
              placeholder="Auto"
            />
            <input
              type="text"
              name="patente"
              value={formState.patente}
              onChange={handleChange}
              placeholder="Patente"
            />
            <input
              type="number"
              name="modelo"
              value={formState.modelo}
              onChange={handleChange}
              placeholder="Modelo"
            />
            <input
              type="text"
              name="aceite"
              value={formState.aceite}
              onChange={handleChange}
              placeholder="Aceite"
            />
            <input
              type="text"
              name="celular"
              value={formState.celular}
              onChange={handleChange}
              placeholder="Celular"
            />
            <input
              type="email"
              name="mail"
              value={formState.mail}
              onChange={handleChange}
              placeholder="Email"
            />
          </>
        )}
        <button type="submit">Agregar</button>
      </form>
    </div>
  );
};

export default AddForm;
