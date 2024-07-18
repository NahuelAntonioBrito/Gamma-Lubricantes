export default class ClientRepository {
  constructor(dao, inactiveClientDao) {
    this.dao = dao;
    this.inactiveClientDao = inactiveClientDao;
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
      throw error;
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

  updateInactiveClients = async () => {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const clients = await this.getAll();
    const inactiveClients = clients
      .map((client) => {
        const sortedHistory = client.history.sort(
          (a, b) => new Date(b.fecha) - new Date(a.fecha)
        );
        const lastHistory = sortedHistory[0];
        if (lastHistory && new Date(lastHistory.fecha) <= sixMonthsAgo) {
          return {
            clientId: client._id,
            name: client.name,
            lastName: client.lastName,
            lastHistory,
          };
        }
      })
      .filter((client) => client !== undefined);

    await this.inactiveClientDao.deleteMany();
    for (const client of inactiveClients) {
      await this.inactiveClientDao.create({
        ...client,
        lastUpdated: new Date(),
      });
    }
  };

  getInactiveClients = async () => {
    try {
      const inactiveClients =
        await this.inactiveClientDao.getAllSortedByLastHistoryDate();
      return inactiveClients;
    } catch (error) {
      console.error("Error al obtener clientes inactivos: ", error);
      throw error;
    }
  };
}
