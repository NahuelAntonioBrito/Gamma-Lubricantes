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
  getByCategory: async (categoryId, page = 1) => {
    return api
      .get(`${endpoint}/category/${categoryId}?page=${page}`)
      .then((response) => response.data);
  },
  getCategories: async () => {
    return api.get(`${endpoint}/categories`).then((response) => response.data);
  },
  getPaginated: async (page, limit = 12) => {
    try {
      const response = await api.get(`${endpoint}/paginated-products`, {
        params: { page, limit },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching paginated products:", error);
      return { products: [], totalPages: 0 };
    }
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
