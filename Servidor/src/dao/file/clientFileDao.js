import fs from "fs";
import path from "path";
import { logToBitacora } from "../../utils/logEvent.js";

class ClientFileDao {
  #clientsPath;

  constructor(clientsPath) {
    // Usa path para asegurar que la ruta sea absoluta
    this.#clientsPath = path.resolve(clientsPath);
  }

  async init() {
    try {
      // Verifica si el archivo existe, si no lo crea
      if (!fs.existsSync(this.#clientsPath)) {
        await fs.promises.writeFile(
          this.#clientsPath,
          JSON.stringify([], null, 2)
        );
        console.log(`Archivo ${this.#clientsPath} creado`);
      }
    } catch (error) {
      console.error(`Error al crear el archivo ${this.#clientsPath}:`, error);
    }
  }

  #generateId(clients) {
    return clients.length === 0 ? 1 : clients[clients.length - 1].id + 1;
  }

  async getAll() {
    try {
      let data = await fs.promises.readFile(this.#clientsPath, "utf-8");
      let clients = JSON.parse(data);
      return clients;
    } catch (error) {
      console.error("Error al leer los clientes:", error);
      return [];
    }
  }

  async create(client) {
    try {
      // Validación de datos (sin incluir el campo persistence aquí)
      const requiredFields = [
        "name",
        "lastName",
        "auto",
        "patente",
        "modelo",
        "aceite",
        "celular",
        "mail",
        "history",
      ];

      const missingFields = requiredFields.filter((field) => !client[field]);

      if (missingFields.length > 0) {
        return `ERROR, faltan los siguientes campos: ${missingFields.join(
          ", "
        )}`;
      }

      // Agregar el campo persistence automáticamente
      client.persistence = {
        lastUpdated: new Date().toISOString(), // Fecha y hora actual en formato ISO
        method: "file", // Método de persistencia, en este caso "file"
      };

      // Obtener todos los clientes y generar el nuevo ID
      let clients = await this.getAll();
      client.id = this.#generateId(clients);

      // Agregar el nuevo cliente a la lista
      clients.push(client);

      // Guardar la lista actualizada en el archivo
      await fs.promises.writeFile(
        this.#clientsPath,
        JSON.stringify(clients, null, 2)
      );
      await logToBitacora("client", "create", client.id, client);
      return client;
    } catch (error) {
      console.error("Error al agregar cliente:", error);
      return `ERROR al agregar el cliente: ${error.message}`;
    }
  }

  async getById(id) {
    try {
      // Verifica si el archivo existe antes de intentar leerlo
      if (!fs.existsSync(this.#clientsPath))
        return "ERROR, el archivo no existe";

      // Lee el archivo y convierte los datos a un array de clientes
      let data = await fs.promises.readFile(this.#clientsPath, "utf-8");
      let clients = JSON.parse(data);

      // Asegúrate de que el ID sea numérico, si es necesario
      const clientId = clients.find((client) => client.id === parseInt(id, 10));

      // Si no se encuentra el cliente, devuelve un mensaje de error
      if (!clientId) {
        return `ERROR, cliente con id ${id} no encontrado`;
      }

      return clientId;
    } catch (error) {
      console.error("Error al buscar cliente por ID:", error);
      return null; // Devuelve null o un mensaje más específico en caso de error
    }
  }
  async getByName(name) {
    try {
      if (!fs.existsSync(this.#clientsPath))
        return "ERROR, el archivo no existe";

      let data = await fs.promises.readFile(this.#clientsPath, "utf-8");
      let clients = JSON.parse(data);

      // Asegúrate de que el ID sea numérico, si es necesario
      const client = clients.find((client) => client.name === name);

      // Si no se encuentra el cliente, devuelve un mensaje de error
      if (!client) {
        return `ERROR, cliente con id ${name} no encontrado`;
      }

      return client;
    } catch (error) {
      console.error("Error al buscar cliente por ID:", error);
      return null; // Devuelve null o un mensaje más específico en caso de error
    }
  }

  async update(id, updatedClientData) {
    try {
      if (!fs.existsSync(this.#clientsPath))
        return "ERROR, el archivo no existe";

      // Lee el archivo
      let data = await fs.promises.readFile(this.#clientsPath, "utf-8");
      let clients = JSON.parse(data);

      // Busca el cliente por su ID
      const clientIndex = clients.findIndex(
        (client) => client.id === parseInt(id, 10)
      );

      // Si no se encuentra el cliente, devuelve un mensaje de error
      if (clientIndex === -1) {
        return `ERROR, cliente con id ${id} no encontrado`;
      }

      // Actualiza solo los campos proporcionados en `updatedClientData`
      clients[clientIndex] = {
        ...clients[clientIndex],
        ...updatedClientData,
        id: clients[clientIndex].id, // Asegura que el ID no cambie
      };

      // Guarda la lista actualizada en el archivo
      await fs.promises.writeFile(
        this.#clientsPath,
        JSON.stringify(clients, null, 2)
      );
      await logToBitacora("client", "update", id, updatedClientData);
      return clients[clientIndex]; // Devuelve el cliente actualizado
    } catch (error) {
      console.error(`Error al actualizar el cliente con id ${id}:`, error);
      return `ERROR al actualizar el cliente: ${error.message}`;
    }
  }

  async delete(id) {
    try {
      if (!fs.existsSync(this.#clientsPath))
        return "ERROR, el archivo no existe";

      // Lee el archivo
      let data = await fs.promises.readFile(this.#clientsPath, "utf-8");
      let clients = JSON.parse(data);

      // Filtra los clientes y elimina el que tiene el ID proporcionado
      const newClientsList = clients.filter(
        (client) => client.id !== parseInt(id, 10)
      );

      // Si la longitud de la lista no cambia, significa que no se encontró el cliente
      if (clients.length === newClientsList.length) {
        return `ERROR, cliente con id ${id} no encontrado`;
      }

      // Guarda la lista actualizada sin el cliente eliminado
      await fs.promises.writeFile(
        this.#clientsPath,
        JSON.stringify(newClientsList, null, 2)
      );
      await logToBitacora("client", "delete", id);
      return `Cliente con id ${id} eliminado con éxito`;
    } catch (error) {
      console.error(`Error al eliminar el cliente con id ${id}:`, error);
      return `ERROR al eliminar el cliente: ${error.message}`;
    }
  }
}

export default ClientFileDao;
