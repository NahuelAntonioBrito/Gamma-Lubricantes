import historyModel from "../dao/models/history.model.js";
import clientModel from "../dao/models/clients.model.js";

class HistoryController {
  async getHistory(req, res) {
    try {
      const history = await historyModel.find();
      res.json({ history });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async addHistoryToClient(req, res) {
    try {
      const clientId = req.params.clientId;
      const { descripcion } = req.body;

      const newHistoryData = {
        fecha: new Date().toISOString(),
        descripcion,
      };

      const newHistory = new historyModel(newHistoryData);
      await newHistory.save();

      const client = await clientModel.findById(clientId);
      if (!client) {
        return res.status(404).json({ error: "Cliente no encontrado" });
      }

      client.history.push(newHistory);
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

      const updatedHistory = await historyModel.findByIdAndUpdate(
        historyId,
        updatedHistoryData,
        { new: true }
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
      const historyId = req.params.historyId;
      const deletedHistory = await historyModel.findByIdAndDelete(historyId);

      if (!deletedHistory) {
        return res.status(404).json({ error: "Historial no encontrado" });
      }

      const client = await clientModel.findOneAndUpdate(
        { history: historyId },
        { $pull: { history: historyId } },
        { new: true }
      );

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
