import { ClientService } from "../services/repositories/index.js";
import { getCurrentPersistenceType } from "../dao/factory.js";

class ClientController {
  async getClients(req, res) {
    try {
      const clients = await ClientService.getAll();
      res.json({ clients });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getInactiveClients(req, res) {
    try {
      const inactiveClients = await ClientService.getInactiveClients();
      res.json({ inactiveClients });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateInactiveClients(req, res) {
    try {
      await ClientService.updateInactiveClients();
      res.status(200).send("Inactive clients updated successfully");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getByName(req, res) {
    try {
      const clientName = req.query.clientName;
      const clients = await ClientService.getByName(clientName);
      res.json({ clients });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getClientById(req, res) {
    try {
      const clientId = req.params.clientId;

      const client = await ClientService.getById(clientId);

      if (!client) {
        return res.status(404).json({ error: "Cliente no encontrado" });
      }
      res.json({ client });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getInactiveLastUpdated(req, res) {
    try {
      const inactiveClients = await ClientService.getInactiveClients();
      res.json(inactiveClients);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async addClient(req, res) {
    try {
      const newClientData = req.body;
      const newClient = await ClientService.create(newClientData);
      const persistenceType = getCurrentPersistenceType();
      if (persistenceType === "MONGO") {
        await newClient.save();
      }
      res.status(201).json({ client: newClient });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateClient(req, res) {
    try {
      const clientId = req.params.id;
      const updatedClientData = req.body;

      const updatedClient = await ClientService.update(
        clientId,
        updatedClientData
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
      const deletedClient = await ClientService.delete(clientId);

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
