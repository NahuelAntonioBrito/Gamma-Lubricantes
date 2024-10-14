import fs from "fs";
import path from "path"; // Importa path para manejar rutas

class inactiveClientFileDao {
  #inactiveClientsPath;

  constructor(inactiveClientsPath) {
    // Usa path para asegurar que la ruta sea absoluta
    this.#inactiveClientsPath = path.resolve(inactiveClientsPath);
  }

  async init() {
    try {
      // Verifica si el archivo existe, si no lo crea
      if (!fs.existsSync(this.#inactiveClientsPath)) {
        await fs.promises.writeFile(
          this.#inactiveClientsPath,
          JSON.stringify([], null, 2)
        );
        console.log(`Archivo ${this.#inactiveClientsPath} creado`);
      }
    } catch (error) {
      console.error(
        `Error al crear el archivo ${this.#inactiveClientsPath}:`,
        error
      );
    }
  }

  #generateId(inactiveClients) {
    return inactiveClients.length === 0
      ? 1
      : inactiveClients[inactiveClients.length - 1].id + 1;
  }

  async getAllSortedByLastHistoryDate() {
    try {
      // Verifica si el archivo existe antes de leer
      if (!fs.existsSync(this.#inactiveClientsPath)) {
        return "ERROR, el archivo no existe";
      }

      // Leer los datos del archivo
      let data = await fs.promises.readFile(this.#inactiveClientsPath, "utf-8");
      let inactiveClients = JSON.parse(data);

      // Ordenar los clientes por la fecha del último historial
      return inactiveClients.sort((a, b) => {
        // Obtener la fecha del último historial, o una fecha muy antigua si no existe historial
        const lastHistoryA =
          a.historial && a.historial.length > 0
            ? new Date(a.historial[a.historial.length - 1].fecha)
            : new Date(0);

        const lastHistoryB =
          b.historial && b.historial.length > 0
            ? new Date(b.historial[b.historial.length - 1].fecha)
            : new Date(0);

        return lastHistoryB - lastHistoryA; // Orden descendente
      });
    } catch (error) {
      console.error("Error al leer y ordenar los clientes inactivos:", error);
      return [];
    }
  }

  async addinactiveClient(inactiveClient) {
    try {
      let inactiveClients = await this.getAll();
      inactiveClient.id = this.#generateId(inactiveClients);
      inactiveClients.push(inactiveClient);
      await fs.promises.writeFile(
        this.#inactiveClientsPath,
        JSON.stringify(inactiveClients, null, 2)
      );
      return inactiveClient;
    } catch (error) {
      console.error("Error al agregar cliente inactivo:", error);
    }
  }
}

export default inactiveClientFileDao;
