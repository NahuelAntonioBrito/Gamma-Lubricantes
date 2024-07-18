import api from "./axios";

const endpoint = "history";

export const history = {
  addHistory: async (clientId, historyData) => {
    try {
      return api
        .post(`${endpoint}/${clientId}`, historyData)
        .then((response) => response.data);
    } catch (error) {
      console.error("Error adding history: ", error);
      throw error;
    }
  },
  deleteHistory: async (historyId, clientId) => {
    try {
      return api
        .delete(`${endpoint}/${historyId}/${clientId}`)
        .then((response) => response.data);
    } catch (error) {
      console.error("Error deleting history: ", error);
      throw error;
    }
  },
};
