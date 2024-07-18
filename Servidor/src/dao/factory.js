// dao/factory.js
import config from "../config/config.js";
import ProductMongoDao from "./productMongoDao.js";
import ClientMongoDao from "./clientsMongoDao.js";
import HistoryMongoDao from "./historyMongoDao.js";
import InactiveClientMongoDao from "./inactiveClientMongoDao.js";

const persistenceType = config.app.persistence;

export const createMongoDAOs = () => {
  if (persistenceType === "MONGO") {
    return {
      productDAO: new ProductMongoDao(),
      clientDAO: new ClientMongoDao(),
      historyDAO: new HistoryMongoDao(),
      inactiveClientDAO: new InactiveClientMongoDao(),
    };
  }
  throw new Error("Tipo de persistencia no válido");
};
