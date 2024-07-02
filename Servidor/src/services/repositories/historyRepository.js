export default class HisrotyRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getAll = async () => {
    try {
      return await this.dao.getAll();
    } catch (error) {
      console.error("Error al obtener todos los historiales: ", error);
      throw error;
    }
  };
  getById = async (id) => {
    try {
      return await this.dao.getById(id);
    } catch (error) {
      console.error("Error al obtener el historial: ", error);
    }
  };
  create = async (data) => {
    try {
      return await this.dao.create(data);
    } catch (error) {
      console.error("Error al crear el historial: ", error);
    }
  };
  update = async (id, data) => {
    try {
      return await this.dao.update(id, data);
    } catch (error) {
      console.error("Error al actualizar el historial: ", error);
    }
  };
  delete = async (id) => {
    try {
      return await this.dao.delete(id);
    } catch (error) {
      console.error("Error al eliminar el historial: ", error);
    }
  };
}
