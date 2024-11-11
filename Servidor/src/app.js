import express from "express";
import compression from "express-compression";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cron from "node-cron";
import clientsRouter from "./routers/clients.router.js";
import productsRouter from "./routers/products.router.js";
import historyRouter from "./routers/history.router.js";
import { ClientService } from "./services/repositories/index.js";
import config from "./config/config.js";
import { switchPersistenceToFile } from "./dao/factory.js";
import checkMongo from "./utils/checkMongoConnection.js";

const { monitorMongoConnection } = checkMongo;
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
export const PORT = process.env.PORT;
const MONGO_DB_NAME = process.env.MONGO_DB_NAME;
let persistenceType = config.app.persistence;

const app = express();
app.use(express.json());
app.use(
  compression({
    brotli: { enabled: true, zlib: {} },
  })
);
app.use(cors());

app.use("/api/products", productsRouter);
app.use("/api/clients", clientsRouter);
app.use("/api/history", historyRouter);

// Cron para actualizar clientes inactivos a las 21:00
cron.schedule("0 21 * * *", async () => {
  console.log("Actualizando clientes inactivos...");
  try {
    await ClientService.updateInactiveClients();
    console.log("Clientes inactivos actualizados.");
  } catch (error) {
    console.error("Error actualizando clientes inactivos:", error);
  }
});

const startServer = async () => {
  // Siempre iniciar el servidor primero
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });

  try {
    // Intentar conectar a MongoDB
    await mongoose.connect(MONGO_URI, {
      dbName: MONGO_DB_NAME,
    });

    console.log(
      "Conexión a MongoDB establecida. Usando persistencia en MongoDB."
    );

    // Iniciar monitoreo de la conexión a Mongo
    await monitorMongoConnection(); // Primera verificación inmediatamente después de conectar
  } catch (error) {
    console.error(
      "Error inicializando la conexión con MongoDB. Cambiando a persistencia de archivos."
    );
    persistenceType = "FILE"; // Cambiar a persistencia de archivos
    switchPersistenceToFile();

    // Iniciar monitoreo de la conexión incluso si Mongo no está disponible
    await monitorMongoConnection(); // Esto permite que Mongo pueda ser restaurado si vuelve a estar disponible
  }
};

// Llamar a la función para iniciar el servidor
startServer();

// Función que verifica la conexión periódicamente
cron.schedule("29 10 * * *", async () => {
  console.log("Verificando la conexión a MongoDB...");
  try {
    await monitorMongoConnection(); // Llama a la función de monitoreo
    console.log("monitorMongoConnection se ejecutó correctamente.");
  } catch (error) {
    console.error("Error ejecutando monitorMongoConnection:", error);
  }
});
