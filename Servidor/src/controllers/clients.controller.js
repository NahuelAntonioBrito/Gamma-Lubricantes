import clientModel from "../models/clients.model.js";

class ClientController {
  async getClients(req, res) {
    try {
      const clients = await clientModel.find();
      res.json({ clients });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getInactiveClients(req, res) {
    try {
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
      const clients = await clientModel.find().populate("history");

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

      res.json({ inactiveClients });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getClientById(req, res) {
    try {
      const clientId = req.params.clientId;

      const client = await clientModel.findById(clientId).populate("history");

      if (!client) {
        return res.status(404).json({ error: "Cliente no encontrado" });
      }
      res.json({ client });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async addClient(req, res) {
    try {
      const newClientData = req.body;
      const newClient = new clientModel(newClientData);
      await newClient.save();
      res.status(201).json({ client: newClient });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateClient(req, res) {
    try {
      const clientId = req.params.id;
      const updatedClientData = req.body;

      const updatedClient = await clientModel.findByIdAndUpdate(
        clientId,
        updatedClientData,
        { new: true }
      );

      if (!updatedClient) {
        return res.status(404).json({ error: "Cliente no encontrado" });
      }

      res.json({ client: updatedClient });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteClient(req, res) {
    try {
      const clientId = req.params.id;
      const deletedClient = await clientModel.findByIdAndDelete(clientId);

      if (!deletedClient) {
        return res.status(404).json({ error: "Cliente no encontrado" });
      }

      res.json({ message: "Cliente eliminado", client: deletedClient });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new ClientController();
