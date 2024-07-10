export default class ProductReposiroty {
  constructor(dao) {
    this.dao = dao;
  }

  getAll = async () => {
    try {
      return await this.dao.getAll();
    } catch (error) {
      console.error("Error al obtener todos los productos: ", error);
      throw error;
    }
  };
  getById = async (id) => {
    try {
      return await this.dao.getById(id);
    } catch (error) {
      console.error("Error al obtener el producto: ", error);
      throw error;
    }
  };
  getByName = async (productName) => {
    try {
      return await this.dao.getByName(productName);
    } catch (error) {
      console.error("Error al obtener los productos: ", error);
      throw error;
    }
  };
  getByCategory = async (productCategory) => {
    try {
      return await this.dao.getByCategory(productCategory);
    } catch (error) {
      console.error("Error al obtener los productos por categoria: ", error);
      throw error;
    }
  };
  create = async (data) => {
    try {
      return await this.dao.create(data);
    } catch (error) {
      console.error("Error al crear el Producto: ", error);
      throw error;
    }
  };
  update = async (id, data) => {
    try {
      return await this.dao.update(id, data);
    } catch (error) {
      console.error("Error al actualizar el Producto: ", error);
      throw error;
    }
  };

  delete = async (id) => {
    try {
      return await this.dao.delete(id);
    } catch (error) {
      console.error("Error al eliminar el Producto: ", error);
      throw error;
    }
  };
}
