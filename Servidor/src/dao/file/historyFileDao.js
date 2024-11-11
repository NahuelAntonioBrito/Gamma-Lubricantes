import fs from "fs";
import path from "path";
import { logToBitacora } from "../../utils/logEvent.js";

class HistoryFileDao {
  #historiesPath;

  constructor(historiesPath) {
    // Usa path para asegurar que la ruta sea absoluta
    this.#historiesPath = path.resolve(historiesPath);
  }

  async init() {
    try {
      // Verifica si el archivo existe, si no lo crea
      if (!fs.existsSync(this.#historiesPath)) {
        await fs.promises.writeFile(
          this.#historiesPath,
          JSON.stringify([], null, 2)
        );
        console.log(`Archivo ${this.#historiesPath} creado`);
      }
    } catch (error) {
      console.error(`Error al crear el archivo ${this.#historiesPath}:`, error);
    }
  }

  #generateId(histories) {
    return histories.length === 0 ? 1 : histories[histories.length - 1].id + 1;
  }

  async getAll() {
    try {
      // Verifica si el archivo existe antes de leer
      if (!fs.existsSync(this.#historiesPath)) {
        return "ERROR, el archivo no existe";
      }

      let data = await fs.promises.readFile(this.#historiesPath, "utf-8");
      let histories = JSON.parse(data);
      return histories;
    } catch (error) {
      console.error("Error al leer los historiales:", error);
      return [];
    }
  }

  async getById(id) {
    try {
      if (!fs.existsSync(this.#historiesPath))
        return "ERROR, el archivo no existe";
      let data = await fs.promises.readFile(this.#historiesPath, "utf-8");
      let histories = JSON.parse(data);
      const historyId = histories.find(
        (history) => history.id === parseInt(id, 10)
      );
      if (!historyId) {
        return `ERROR, el historial con id ${id} no encontrado`;
      }
      return historyId;
    } catch (error) {
      console.error("Error al buscar el historial por ID: ", error);
      return null;
    }
  }

  async create(history) {
    try {
      // Agregar el campo persistence automáticamente
      history.persistence = {
        lastUpdated: new Date().toISOString(), // Fecha y hora actual en formato ISO
        method: "file", // Método de persistencia, en este caso "file"
      };
      let histories = await this.getAll();
      history.id = this.#generateId(histories);
      histories.push(history);
      await fs.promises.writeFile(
        this.#historiesPath,
        JSON.stringify(histories, null, 2)
      );
      await logToBitacora("history", "create", history.id, history);
      return history;
    } catch (error) {
      console.error("Error al agregar el historial:", error);
    }
  }
  async update(id, updatedHistory) {
    try {
      if (!fs.existsSync(this.#historiesPath)) {
        return "ERROR, el archivo no existe";
      }

      let data = await fs.promises.readFile(this.#historiesPath, "utf-8");
      let histories = JSON.parse(data);

      let index = histories.findIndex(
        (history) => history.id === parseInt(id, 10)
      );
      if (index === -1) {
        return `ERROR, historial con id ${id} no encontrado`;
      }

      // Mantener el ID del historial original y actualizar los otros campos
      histories[index] = {
        ...histories[index],
        ...updatedHistory,
        id: histories[index].id,
      };

      await fs.promises.writeFile(
        this.#historiesPath,
        JSON.stringify(histories, null, 2)
      );
      await logToBitacora("history", "update", id, updatedHistory);
      return histories[index];
    } catch (error) {
      console.error("Error al actualizar historial:", error);
      return null;
    }
  }
  async delete(id) {
    try {
      if (!fs.existsSync(this.#historiesPath)) {
        return "ERROR, el archivo no existe";
      }

      let data = await fs.promises.readFile(this.#historiesPath, "utf-8");
      let histories = JSON.parse(data);

      const newHistories = histories.filter(
        (history) => history.id !== parseInt(id, 10)
      );
      if (newHistories.length === histories.length) {
        return `ERROR, historial con id ${id} no encontrado`;
      }

      await fs.promises.writeFile(
        this.#historiesPath,
        JSON.stringify(newHistories, null, 2)
      );
      await logToBitacora("history", "delete", id);
      return `Historial con id ${id} eliminado correctamente`;
    } catch (error) {
      console.error("Error al eliminar historial:", error);
      return null;
    }
  }
}

export default HistoryFileDao;
