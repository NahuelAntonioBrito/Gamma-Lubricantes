import { BrowserRouter, Routes, Route } from "react-router-dom";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer";
import ClientList from "./components/ClientList/ClientList";
import AddForm from "./components/AddForm/AddForm";
import UpdateItem from "./components/UpdateItem/UpdateItem";
import { clients } from "../public/clients";
import { products } from "../public/products";
import "./App.css";

function App() {
  const handleAddProduct = (newProduct) => {
    products.push(newProduct);
    console.log("Producto agregado:", newProduct);
  };

  const handleAddClient = (newClient) => {
    clients.push(newClient);
    console.log("Cliente agregado:", newClient);
  };
  return (
    <BrowserRouter>
      <h1>Bienvenido a Gamma Lubricantes</h1>
      <Routes>
        <Route path="/" element={<ItemListContainer />} />
        <Route path="/category/:categoryId" element={<ItemListContainer />} />
        <Route path="/product/:productId" element={<ItemDetailContainer />} />
        <Route path="/clients" element={<ClientList />} />
        <Route
          path="/add-product"
          element={<AddForm type="product" onAdd={handleAddProduct} />}
        />
        <Route
          path="/add-client"
          element={<AddForm type="client" onAdd={handleAddClient} />}
        />
        <Route path="/update-product" element={<UpdateItem type="product" />} />
        <Route path="/update-client" element={<UpdateItem type="client" />} />
        <Route path="*" element={<h1>ERROR 404</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
