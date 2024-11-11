export default class ProductReposiroty {
  constructor(createDAOs) {
    this.createDAOs = createDAOs;
  }

  // Función auxiliar para obtener el clientDAO actualizado dinámicamente
  getProductDAO = () => {
    const { productDAO } = this.createDAOs();
    return productDAO;
  };

  getAll = async () => {
    try {
      const productDAO = this.getProductDAO();
      return await productDAO.getAll();
    } catch (error) {
      console.error("Error al obtener todos los productos: ", error);
      throw error;
    }
  };
  getById = async (id) => {
    try {
      const productDAO = this.getProductDAO();
      return await productDAO.getById(id);
    } catch (error) {
      console.error("Error al obtener el producto: ", error);
      throw error;
    }
  };
  getByName = async (productName) => {
    try {
      const productDAO = this.getProductDAO();
      return await productDAO.getByName(productName);
    } catch (error) {
      console.error("Error al obtener los productos: ", error);
      throw error;
    }
  };
  getByCategory = async (productCategory) => {
    try {
      const productDAO = this.getProductDAO();
      return await productDAO.getByCategory(productCategory);
    } catch (error) {
      console.error("Error al obtener los productos: ", error);
      throw error;
    }
  };
  async getByCategoryPaginated(productCategory, page, limit) {
    try {
      const productDAO = this.getProductDAO();
      return await productDAO.getByCategoryPaginated(
        productCategory,
        page,
        limit
      );
    } catch (error) {
      console.error("Error al obtener los productos por categoria: ", error);
      throw error;
    }
  }

  getCategories = async () => {
    try {
      const productDAO = this.getProductDAO();
      return await productDAO.getCategories();
    } catch (error) {
      console.error("Error al obtener las categorias: ", error);
      throw error;
    }
  };
  create = async (data) => {
    try {
      const productDAO = this.getProductDAO();
      return await productDAO.create(data);
    } catch (error) {
      console.error("Error al crear el Producto: ", error);
      throw error;
    }
  };
  update = async (id, data) => {
    try {
      const productDAO = this.getProductDAO();
      return await productDAO.update(id, data);
    } catch (error) {
      console.error("Error al actualizar el Producto: ", error);
      throw error;
    }
  };

  delete = async (id) => {
    try {
      const productDAO = this.getProductDAO();
      return await productDAO.delete(id);
    } catch (error) {
      console.error("Error al eliminar el Producto: ", error);
      throw error;
    }
  };
  getPaginated = async (page, limit) => {
    try {
      const productDAO = this.getProductDAO();
      return await productDAO.getPaginated(page, limit);
    } catch (error) {
      console.error("Error al obtener los Productos paginados: ", error);
      throw error;
    }
  };
}
