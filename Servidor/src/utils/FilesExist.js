import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Estas dos líneas reemplazan a __dirname en módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const ensureFilesExist = (fileNames) => {
  const filePaths = {};

  try {
    const dirPath = path.join(__dirname, "../data"); // Carpeta donde estarán los archivos

    // Verifica si la carpeta 'data' existe, si no, la crea
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath);
      console.log(`Carpeta ${dirPath} creada`);
    }

    // Verifica y crea los archivos necesarios
    fileNames.forEach((fileName) => {
      const filePath = path.join(dirPath, fileName);

      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify([]));
        console.log(`Archivo ${filePath} creado`);
      }

      filePaths[fileName] = filePath; // Guardamos la ruta en el objeto de resultados
    });

    return filePaths; // Devolvemos las rutas de todos los archivos
  } catch (error) {
    console.error(`Error al manejar los archivos:`, error);
    return `ERROR: No se pudieron crear o acceder a los archivos especificados`;
  }
};
