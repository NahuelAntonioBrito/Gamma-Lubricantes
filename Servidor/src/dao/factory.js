import config from "../config/config.js";
import ProductMongoDao from "./mongo/productMongoDao.js";
import ClientMongoDao from "./mongo/clientsMongoDao.js";
import HistoryMongoDao from "./mongo/historyMongoDao.js";
import InactiveClientMongoDao from "./mongo/inactiveClientMongoDao.js";
import ClientFileDao from "./file/clientFileDao.js";
import ProductFileDao from "./file/productFileDao.js";
import HistoryFileDao from "./file/historyFileDao.js";
import InactiveClientFileDao from "./file/inactiveClientFileDao.js";
import { ensureFilesExist } from "../utils/FilesExist.js";

let persistenceType = config.app.persistence;

const getCurrentPersistenceType = () => persistenceType; // Función para obtener el tipo de persistencia actual

const setCurrentPersistenceType = (newPersistenceType) => {
  persistenceType = newPersistenceType; // Función para actualizar la persistencia
};

// Cambiar a persistencia de archivos cuando Mongo falla
const switchPersistenceToFile = () => {
  console.log("Cambiando a persistencia de archivos...");
  setCurrentPersistenceType("FILE"); // Actualizar la persistencia globalmente
  console.log("Persistencia cambiada a archivos.");
};

// Función para obtener el DAO dinámicamente según el tipo de persistencia actual
const createDAOs = () => {
  const persistenceType = getCurrentPersistenceType(); // Obtener el tipo de persistencia actual
  console.log("getCurrentPersistenceType: ", persistenceType);
  if (persistenceType === "MONGO") {
    return {
      productDAO: new ProductMongoDao(),
      clientDAO: new ClientMongoDao(),
      historyDAO: new HistoryMongoDao(),
      inactiveClientDAO: new InactiveClientMongoDao(),
    };
  } else if (persistenceType === "FILE") {
    // Verificar o crear los archivos necesarios
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

export {
  createDAOs,
  switchPersistenceToFile,
  getCurrentPersistenceType,
  setCurrentPersistenceType,
};
