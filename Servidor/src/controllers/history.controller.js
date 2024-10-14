import {
  ClientService,
  HistoryService,
} from "../services/repositories/index.js";

class HistoryController {
  async getHistory(req, res) {
    try {
      const history = await HistoryService.getAll();
      res.json({ history });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async addOldHistoryToClient(req, res) {
    try {
      const clientId = req.params.clientId;
      const { descripcion, kilometres } = req.body;

      // Crear una fecha de hace 6 meses
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

      const newHistoryData = {
        fecha: sixMonthsAgo,
        descripcion,
        kilometres,
        client: clientId,
      };

      // Crear el historial y guardar en la base de datos
      const newHistory = await HistoryService.create(newHistoryData);

      // Buscar el cliente por su ID
      const client = await ClientService.getById(clientId);
      if (!client) {
        return res.status(404).json({ error: "Cliente no encontrado" });
      }

      // Asegúrate de que 'history' es un array válido
      if (!client.history) {
        client.history = []; // Inicializa si no existe
      }

      // Agregar la referencia de la historia usando el mismo '_id'
      client.history.push({
        _id: newHistory._id, // Asegurarse de usar el mismo _id generado
        fecha: newHistory.fecha,
        descripcion: newHistory.descripcion,
      });

      // Actualizar el cliente con el nuevo historial
      await ClientService.update(clientId, client);

      res.status(201).json({ client: client, history: newHistory });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async addHistoryToClient(req, res) {
    try {
      const clientId = req.params.clientId;
      const { descripcion, kilometres } = req.body;

      // Crear el nuevo historial
      const newHistoryData = {
        fecha: new Date(), // o puedes usar el valor de la fecha desde req.body
        descripcion,
        kilometres,
        client: clientId,
      };

      // Guardar el historial en el servicio (puedes ajustar esto si es necesario)
      const newHistory = await HistoryService.create(newHistoryData);

      // Buscar el cliente por ID
      const client = await ClientService.getById(clientId);
      if (!client) {
        return res.status(404).json({ error: "Cliente no encontrado" });
      }
      console.log("newHistoryData: ", newHistoryData);
      // Agregar el nuevo historial al array 'historial'
      client.history.push({
        id: newHistory.id, // Asegúrate de que esto sea el id generado correctamente
        fecha: newHistoryData.fecha, // Usar la fecha desde el historial
        descripcion: newHistoryData.descripcion, // Aquí se agrega la descripción
      });

      // Guardar cambios en el cliente
      await ClientService.update(clientId, client);

      res.status(201).json({ client: client });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateHistory(req, res) {
    try {
      const historyId = req.params.historyId;
      const updatedHistoryData = req.body;

      const updatedHistory = await HistoryService.update(
        historyId,
        updatedHistoryData
      );

      if (!updatedHistory) {
        return res.status(404).json({ error: "Historial no encontrado" });
      }

      res.json({ historial: updatedHistory });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteHistory(req, res) {
    try {
      const { clientId, historyId } = req.params;
      console.log("historyId: ", historyId);

      const deletedHistory = await HistoryService.delete(historyId);

      if (!deletedHistory) {
        return res.status(404).json({ error: "Historial no encontrado" });
      }

      const client = await ClientService.update(clientId, {
        $pull: { history: historyId },
      });

      if (!client) {
        return res.status(404).json({ error: "Cliente no encontrado" });
      }

      res.json({
        message: "Historial eliminado y referencia actualizada",
        historial: deletedHistory,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new HistoryController();
