import InactiveClient from "./models/inactiveClient.model.js";

export default class InactiveClientDao {
  async getAllSortedByLastHistoryDate() {
    try {
      const inactiveClients = await InactiveClient.find().populate(
        "lastHistory"
      );
      return inactiveClients.sort((a, b) => {
        const dateA = a.lastHistory ? a.lastHistory.fecha : new Date(0);
        const dateB = b.lastHistory ? b.lastHistory.fecha : new Date(0);
        return dateB - dateA;
      });
    } catch (error) {
      console.error(
        "Error al obtener todos los clientes inactivos ordenados: ",
        error
      );
      throw error;
    }
  }

  async create(data) {
    try {
      return await InactiveClient.create(data);
    } catch (error) {
      console.error("Error al crear el cliente inactivo: ", error);
      throw error;
    }
  }

  async deleteMany() {
    try {
      return await InactiveClient.deleteMany();
    } catch (error) {
      console.error("Error al eliminar clientes inactivos: ", error);
      throw error;
    }
  }
}
