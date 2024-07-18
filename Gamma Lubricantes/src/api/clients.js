import api from "./axios";

const endpoint = "clients";

export const clients = {
  getAll: async () => {
    return api.get(endpoint).then((response) => response.data);
  },
  getInactive: async () => {
    return api.get(`${endpoint}/inactivos`).then((response) => response.data);
  },
  getLastUpdate: async () => {
    return api
      .get(`${endpoint}/inactive-last-updated`)
      .then((response) => response.data);
  },
  getByName: async (name) => {
    return api
      .get(`${endpoint}/name?clientName=${name}`)
      .then((response) => response.data.clients);
  },
  getById: async (id) => {
    return api
      .get(`${endpoint}/${id}`)
      .then((response) => response.data.client);
  },
  addClient: async (clientData) => {
    return api.post(endpoint, clientData).then((response) => response.data);
  },
  updateClient: async (id, updateData) => {
    return api
      .put(`${endpoint}/${id}`, updateData)
      .then((response) => response.data);
  },
  deleteClient: async (id) => {
    return api.delete(`${endpoint}/${id}`).then((response) => response.data);
  },
};
