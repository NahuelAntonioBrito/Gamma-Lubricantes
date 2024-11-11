// logevents.js
import { promises as fs } from "fs";
import { ensureFilesExist } from "./FilesExist.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Asegurarse de que el archivo de bitácora exista
const logFiles = ensureFilesExist(["mongo_fallback_log.json"]);
const logFilePath = logFiles["mongo_fallback_log.json"]; // Obtén la ruta del archivo

export const logEvent = async (event, details = {}) => {
  const logEntry = {
    timestamp: new Date().toISOString(),
    event,
    details,
  };

  try {
    let logs = [];
    try {
      const data = await fs.readFile(logFilePath, "utf8");
      logs = data ? JSON.parse(data) : [];
    } catch (readError) {
      if (readError.code !== "ENOENT") {
        throw readError;
      }
    }
    logs.push(logEntry);
    await fs.writeFile(logFilePath, JSON.stringify(logs, null, 2));
    console.log("Evento registrado en la bitácora:", logEntry);
  } catch (error) {
    console.error("Error en el manejo de la bitácora:", error);
  }
};

export const logToBitacora = async (entity, action, id, data = {}) => {
  const logEntry = {
    timestamp: new Date().toISOString(),
    entity,
    action,
    id,
    data,
  };

  try {
    let logs = [];
    try {
      const data = await fs.readFile(logFilePath, "utf8");
      logs = data ? JSON.parse(data) : [];
    } catch (readError) {
      if (readError.code !== "ENOENT") {
        throw readError;
      }
    }
    logs.push(logEntry);
    await fs.writeFile(logFilePath, JSON.stringify(logs, null, 2));
    console.log("Evento registrado en la bitácora:", logEntry);
  } catch (error) {
    console.error("Error en el manejo de la bitácora:", error);
  }
};
