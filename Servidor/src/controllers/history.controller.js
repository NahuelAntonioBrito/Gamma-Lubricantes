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

      const newHistory = await HistoryService.create(newHistoryData);

      const client = await ClientService.getById(clientId);
      if (!client) {
        return res.status(404).json({ error: "Cliente no encontrado" });
      }

      client.history.push(newHistory._id);
      await client.save();

      res.status(201).json({ client: client, history: newHistory });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async addHistoryToClient(req, res) {
    try {
      const clientId = req.params.clientId;
      const { descripcion, kilometres } = req.body;

      const newHistoryData = {
        fecha: new Date(),
        descripcion,
        kilometres,
        client: clientId,
      };

      const newHistory = await HistoryService.create(newHistoryData);

      const client = await ClientService.getById(clientId);
      if (!client) {
        return res.status(404).json({ error: "Cliente no encontrado" });
      }

      client.history.push(newHistory._id);
      await client.save();

      res.status(201).json({ client: client, history: newHistory });
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
