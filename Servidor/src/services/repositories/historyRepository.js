export default class HisrotyRepository {
  constructor(createDAOs) {
    this.createDAOs = createDAOs;
  }

  // Función auxiliar para obtener el clientDAO actualizado dinámicamente
  getHistoryDAO = () => {
    const { historyDAO } = this.createDAOs();
    return historyDAO;
  };

  getAll = async () => {
    try {
      const historyDAO = this.getHistoryDAO();
      return await historyDAO.getAll();
    } catch (error) {
      console.error("Error al obtener todos los historiales: ", error);
      throw error;
    }
  };
  getById = async (id) => {
    try {
      const historyDAO = this.getHistoryDAO();
      return await historyDAO.getById(id);
    } catch (error) {
      console.error("Error al obtener el historial: ", error);
    }
  };
  create = async (data) => {
    try {
      const historyDAO = this.getHistoryDAO();
      return await historyDAO.create(data);
    } catch (error) {
      console.error("Error al crear el historial: ", error);
    }
  };
  update = async (id, data) => {
    try {
      const historyDAO = this.getHistoryDAO();
      return await historyDAO.update(id, data);
    } catch (error) {
      console.error("Error al actualizar el historial: ", error);
    }
  };
  delete = async (id) => {
    try {
      const historyDAO = this.getHistoryDAO();
      return await historyDAO.delete(id);
    } catch (error) {
      console.error("Error al eliminar el historial: ", error);
    }
  };
}
