import mongoose from "mongoose";
import { switchPersistenceToFile } from "../dao/factory.js";
import ProductFileDao from "../dao/file/productFileDao.js";
import { logEvent } from "./logEvent.js";

let mongoLastDownTime = null; // Variable para almacenar la fecha de caída
let syncPending = false; // Indica si hay productos pendientes de sincronizar

async function checkMongoConnection() {
  try {
    // Verificar si la conexión a MongoDB está establecida
    if (mongoose.connection.readyState !== 1) {
      // 1 significa conectado
      throw new Error("MongoDB no está conectado.");
    }

    const timeoutPromise = new Promise(
      (resolve, reject) => setTimeout(() => reject(new Error("Timeout")), 5000) // Timeout de 5 segundos
    );

    const pingPromise = mongoose.connection.db.admin().ping();

    await Promise.race([pingPromise, timeoutPromise]);

    return true; // Mongo está disponible
  } catch (error) {
    console.error("Error al hacer ping a MongoDB:", error);

    if (!mongoLastDownTime) {
      mongoLastDownTime = new Date(); // Guardar la fecha exacta de caída si aún no ha sido almacenada
      syncPending = true; // Activar la bandera de sincronización pendiente
      console.log(
        "Mongo se ha desconectado. Almacenando mongoLastDownTime: ",
        mongoLastDownTime
      );
      console.log("syncPending activado: ", syncPending);

      // Registrar la caída en la bitácora
      await logEvent("mongodb_down", {
        mongoLastDownTime,
        syncPending,
      });
    }

    return false; // Mongo está caído
  }
}

const monitorMongoConnection = async () => {
  console.log("Iniciando monitoreo de la conexión a Mongo...");
  try {
    const mongoAvailable = await checkMongoConnection();
    console.log("Resultado de checkMongoConnection:", mongoAvailable);

    if (!mongoAvailable) {
      console.log(
        "MongoDB no está disponible. Cambiando a persistencia de archivos."
      );
      switchPersistenceToFile(); // Cambia a persistencia de archivos si Mongo está caído

      // Registrar el cambio de persistencia en la bitácora
      await logEvent("switch_to_file_persistence", {
        timestamp: new Date(),
      });
    } else {
      console.log("MongoDB está disponible.");

      console.log("IsPending: ", syncPending);
      if (syncPending) {
        console.log("Sincronización pendiente detectada.");
        try {
          await syncFileDataToMongo(); // Intentar sincronizar los productos de archivos a Mongo
          syncPending = false; // Desactiva la bandera una vez sincronizados los datos
          mongoLastDownTime = null; // Solo después de sincronizar los datos, reinicia la variable
          console.log("Sincronización completada y flags reiniciados.");

          // Registrar la sincronización exitosa en la bitácora
          await logEvent("sync_completed", {
            timestamp: new Date(),
          });
        } catch (syncError) {
          console.error(
            "Error durante la sincronización de productos a MongoDB:",
            syncError
          );

          // Registrar el error de sincronización en la bitácora
          await logEvent("sync_error", {
            error: syncError.message,
          });
        }
      }
    }
  } catch (error) {
    console.error("Error monitoreando la conexión a MongoDB:", error);

    // Registrar el error en la bitácora
    await logEvent("monitor_error", {
      error: error.message,
    });
  }
};

async function syncFileDataToMongo() {
  console.log("Iniciando la sincronización de datos desde archivos a Mongo...");
  try {
    // Obtener todos los productos que fueron creados desde que MongoDB estuvo caído
    const fileProducts = await ProductFileDao.getAll();

    // Filtrar los productos creados o actualizados desde que MongoDB estuvo caído
    const productsToSync = fileProducts.filter(
      (product) =>
        new Date(product.persistence.lastUpdated) >= mongoLastDownTime
    );

    console.log("Productos a sincronizar:", productsToSync);

    // Sincronizar cada producto a MongoDB
    for (const product of productsToSync) {
      await mongoProductDAO.createOrUpdate(product); // Crear o actualizar el producto en Mongo
    }
    console.log("Sincronización de productos completada.");
  } catch (error) {
    console.error("Error durante la sincronización de productos:", error);
  }
}

export default { checkMongoConnection, monitorMongoConnection };
