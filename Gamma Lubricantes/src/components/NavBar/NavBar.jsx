import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchBar from "../SearchBar/SearchBar";
import NotificationBell from "../NotificationBell/NotificationBell";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleNavigate = (item) => {
    if (item.title) {
      navigate(`/product/${item._id}`);
    } else if (item.name) {
      navigate(`/clients/${item._id}`);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
      <div className="container-fluid">
        <Link to={"/"} className="navbar-brand">
          Home
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <a
                href="#"
                className="nav-link dropdown-toggle"
                id="clientsDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Clientes
              </a>
              <ul className="dropdown-menu" aria-labelledby="clientsDropdown">
                <li>
                  <Link className="dropdown-item" to="/clients">
                    Ver Clientes
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/add-client">
                    Agregar Cliente
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/update-client">
                    Actualizar Cliente
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/delete-client">
                    Eliminar Cliente
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="productsDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Productos
              </a>
              <ul className="dropdown-menu" aria-labelledby="productsDropdown">
                <li>
                  <Link className="dropdown-item" to="/products">
                    Ver Productos
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/add-product">
                    Agregar Producto
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/update-product">
                    Actualizar Producto
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/delete-product">
                    Eliminar Producto
                  </Link>
                </li>
              </ul>
            </li>
            <NotificationBell />
          </ul>
          <SearchBar
            onNavigate={handleNavigate}
            placeholder="Buscar productos o clientes"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
