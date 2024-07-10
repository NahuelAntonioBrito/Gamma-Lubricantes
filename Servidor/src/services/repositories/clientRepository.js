export default class ClientRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getAll = async () => {
    try {
      return await this.dao.getAll();
    } catch (error) {
      console.error("Error al obtener todos los clientes: ", error);
      throw error;
    }
  };

  getById = async (id) => {
    try {
      return await this.dao.getById(id);
    } catch (error) {
      console.error("Error al obtener el cliente: ", error);
    }
  };

  getByName = async (clientName) => {
    try {
      return await this.dao.getByName(clientName);
    } catch (error) {
      console.error("Error al obtener los clientes: ", error);
      throw error;
    }
  };

  create = async (data) => {
    try {
      return await this.dao.create(data);
    } catch (error) {
      console.error("Error al crear el Cliente: ", error);
    }
  };

  update = async (id, data) => {
    try {
      return await this.dao.update(id, data);
    } catch (error) {
      console.error("Error al actualizar el cliente: ", error);
    }
  };

  delete = async (id) => {
    try {
      return await this.dao.delete(id);
    } catch (error) {
      console.error("Error al eliminar el cliente: ", error);
    }
  };
}
