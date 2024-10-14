import config from "../config/config.js";
import ProductMongoDao from "./mongo/productMongoDao.js";
import ClientMongoDao from "./mongo/clientsMongoDao.js";
import HistoryMongoDao from "./mongo/historyMongoDao.js";
import InactiveClientMongoDao from "./mongo/inactiveClientMongoDao.js";
import ClientFileDao from "./file/clientFileDao.js";
import ProductFileDao from "./file/productFileDao.js";
import HistoryFileDao from "./file/historyFileDao.js";
import InactiveClientFileDao from "./file/inactiveClientFileDao.js";
import { ensureFilesExist } from "../utils/fileUtils.js";

const persistenceType = config.app.persistence;
console.log("persistence: ", persistenceType);

const createDAOs = () => {
  if (persistenceType === "MONGO") {
    return {
      productDAO: new ProductMongoDao(),
      clientDAO: new ClientMongoDao(),
      historyDAO: new HistoryMongoDao(),
      inactiveClientDAO: new InactiveClientMongoDao(),
    };
  } else if (persistenceType === "FILE") {
    // Verificamos o creamos los archivos necesarios
    const filesToCheck = [
      "products.json",
      "clients.json",
      "inactiveclients.json",
      "histories.json",
    ];
    const filePaths = ensureFilesExist(filesToCheck);

    if (typeof filePaths === "string" && filePaths.startsWith("ERROR")) {
      throw new Error(filePaths);
    }

    return {
      productDAO: new ProductFileDao(filePaths["products.json"]),
      clientDAO: new ClientFileDao(filePaths["clients.json"]),
      historyDAO: new HistoryFileDao(filePaths["histories.json"]),
      inactiveClientDAO: new InactiveClientFileDao(
        filePaths["inactiveclients.json"]
      ),
    };
  }

  throw new Error("Tipo de persistencia no válido");
};

export default createDAOs;
