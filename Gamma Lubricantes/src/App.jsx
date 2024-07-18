import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer";
import ClientList from "./components/ClientList/ClientList";
import ClientDetail from "./components/ClientDetail/ClientDetail";
import AddForm from "./components/AddForm/AddForm";
import AddHistoryForm from "./components/AddHistoryForm/AddHistoryForm";
import UpdateItem from "./components/UpdateItem/UpdateItem";
import DeleteItem from "./components/DeleteItem/DeleteItem";
import Navbar from "./components/NavBar/NavBar";
import InactiveClientsContainer from "./components/InactiveClientsContainer/InactiveClientsContainer";
import { clients } from "../public/clients";
import { products } from "../public/products";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";

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
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<Home title="Bienvenido a Gamma Lubricantes" />}
        />
        <Route path="/products" element={<ItemListContainer />} />
        <Route path="/category/:categoryId" element={<ItemListContainer />} />
        <Route path="/product/:productId" element={<ItemDetailContainer />} />
        <Route path="/clients" element={<ClientList />} />
        <Route path="/clients/:clientId" element={<ClientDetail />} />
        <Route
          path="/inactive-clients"
          element={<InactiveClientsContainer />}
        />
        <Route
          path="/add-product"
          element={<AddForm type="product" onAdd={handleAddProduct} />}
        />
        <Route
          path="/add-client"
          element={<AddForm type="client" onAdd={handleAddClient} />}
        />
        <Route path="/add-history/:clientId" element={<AddHistoryForm />} />
        <Route path="/update-product" element={<UpdateItem type="product" />} />
        <Route path="/update-client" element={<UpdateItem type="client" />} />
        <Route path="/delete-product" element={<DeleteItem type="product" />} />
        <Route path="/delete-client" element={<DeleteItem type="client" />} />
        <Route path="*" element={<h1>ERROR 404</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
