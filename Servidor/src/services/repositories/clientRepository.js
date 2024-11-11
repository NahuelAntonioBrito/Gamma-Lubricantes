export default class ClientRepository {
  constructor(createDAOs, inactiveClientDao) {
    this.createDAOs = createDAOs;
    this.inactiveClientDao = inactiveClientDao;
  }

  // Función auxiliar para obtener el clientDAO actualizado dinámicamente
  getClientDAO = () => {
    const { clientDAO } = this.createDAOs();
    return clientDAO;
  };

  // Obtener todos los clientes
  getAll = async () => {
    try {
      const clientDAO = this.getClientDAO(); // Llamada a la función auxiliar
      return await clientDAO.getAll();
    } catch (error) {
      console.error("Error al obtener todos los clientes: ", error);
      throw error;
    }
  };

  // Obtener cliente por ID
  getById = async (id) => {
    try {
      const clientDAO = this.getClientDAO(); // Llamada a la función auxiliar
      return await clientDAO.getById(id);
    } catch (error) {
      console.error("Error al obtener el cliente por ID: ", error);
      throw error;
    }
  };

  // Obtener cliente por nombre
  getByName = async (clientName) => {
    try {
      const clientDAO = this.getClientDAO(); // Llamada a la función auxiliar
      return await clientDAO.getByName(clientName);
    } catch (error) {
      console.error("Error al obtener el cliente por nombre: ", error);
      throw error;
    }
  };

  // Crear nuevo cliente
  create = async (data) => {
    try {
      const clientDAO = this.getClientDAO(); // Llamada a la función auxiliar
      return await clientDAO.create(data);
    } catch (error) {
      console.error("Error al crear el cliente: ", error);
      throw error;
    }
  };

  // Actualizar cliente existente
  update = async (id, data) => {
    try {
      const clientDAO = this.getClientDAO(); // Llamada a la función auxiliar
      return await clientDAO.update(id, data);
    } catch (error) {
      console.error("Error al actualizar el cliente: ", error);
      throw error;
    }
  };

  // Eliminar cliente por ID
  delete = async (id) => {
    try {
      const clientDAO = this.getClientDAO(); // Llamada a la función auxiliar
      return await clientDAO.delete(id);
    } catch (error) {
      console.error("Error al eliminar el cliente: ", error);
      throw error;
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
