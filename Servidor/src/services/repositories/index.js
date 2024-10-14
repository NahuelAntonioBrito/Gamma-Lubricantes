import createDAOs from "../../dao/factory.js";

import ProductRepository from "./productRepository.js";
import ClientRepository from "./clientRepository.js";
import HistoryRepository from "./historyRepository.js";

// Usa la función createDAOs para obtener los DAOs
const { productDAO, clientDAO, historyDAO, inactiveClientDAO } = createDAOs();

export const ProductService = new ProductRepository(productDAO);
export const ClientService = new ClientRepository(clientDAO, inactiveClientDAO);
export const HistoryService = new HistoryRepository(historyDAO);
