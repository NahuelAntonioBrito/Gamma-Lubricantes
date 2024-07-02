import { createMongoDAOs } from "../../dao/factory.js";
import ProductRepository from "./productRepository.js";
import ClientRepository from "./clientRepository.js";
import HisrotyRepository from "./historyRepository.js";

const { productDAO, clientDAO, historyDAO } = createMongoDAOs();
export const ProductService = new ProductRepository(productDAO);
export const ClientService = new ClientRepository(clientDAO);
export const HistoryService = new HisrotyRepository(historyDAO);
