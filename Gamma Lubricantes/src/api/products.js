import api from "./axios";

const endpoint = "products";

export const products = {
  getAll: async () => {
    try {
      const response = await api.get(endpoint);
      return response.data.products;
    } catch (error) {
      console.error("Error fetching all products:", error);
      return [];
    }
  },
  getById: async (id) => {
    return api
      .get(`${endpoint}/${id}`)
      .then((response) => response.data.product);
  },
  getByName: async (name) => {
    return api
      .get(`${endpoint}/name?productName=${name}`)
      .then((response) => response.data.products);
  },
  getByCategory: async (categoryId) => {
    return api
      .get(`${endpoint}/category/${categoryId}`)
      .then((response) => response.data.products);
  },
  addProduct: async (productData) => {
    return api.post(endpoint, productData).then((response) => response.data);
  },
  updateProduct: async (id, updateData) => {
    return api
      .put(`${endpoint}/${id}`, updateData)
      .then((response) => response.data);
  },
  deleteProduct: async (id) => {
    return api.delete(`${endpoint}/${id}`).then((response) => response.data);
  },
};
