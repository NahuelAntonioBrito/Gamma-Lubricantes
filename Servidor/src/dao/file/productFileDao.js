import fs from "fs";
import path from "path";

class ProductFileDao {
  #productsPath;

  constructor(productsPath) {
    this.#productsPath = path.resolve(productsPath);
  }

  async init() {
    try {
      if (!fs.existsSync(this.#productsPath)) {
        await fs.promises.writeFile(
          this.#productsPath,
          JSON.stringify([], null, 2)
        );
        console.log(`Archivo ${this.#productsPath} creado`);
      }
    } catch (error) {
      console.error(`Error al crear el archivo ${this.#productsPath}:`, error);
    }
  }

  #generateId(products) {
    return products.length === 0 ? 1 : products[products.length - 1].id + 1;
  }

  async getAll() {
    try {
      if (!fs.existsSync(this.#productsPath)) {
        return "ERROR, el archivo no existe";
      }
      let data = await fs.promises.readFile(this.#productsPath, "utf-8");
      let clients = JSON.parse(data);
      return clients;
    } catch (error) {
      console.error("Error al leer los productos:", error);
      return [];
    }
  }
  async create(product) {
    try {
      const requiredFields = [
        "title",
        "liters",
        "price",
        "thumbnails",
        "status",
        "code",
        "stock",
        "carCompatibility",
      ];

      const missingFields = requiredFields.filter((field) => !product[field]);

      if (missingFields.length > 0) {
        return `ERROR, faltan los siguientes campos: ${missingFields.join(
          ", "
        )}`;
      }
      let products = await this.getAll();
      product.id = this.#generateId(products);
      products.push(product);
      await fs.promises.writeFile(
        this.#productsPath,
        JSON.stringify(products, null, 2)
      );
      return product;
    } catch (error) {
      console.error("Error al agregar producto:", error);
    }
  }
  async getById(id) {
    try {
      if (!fs.existsSync(this.#productsPath))
        return "ERROR, el archivo no existe";
      let data = await fs.promises.readFile(this.#productsPath, "utf-8");
      let products = JSON.parse(data);
      const productId = products.find(
        (product) => product.id === parseInt(id, 10)
      );
      if (!productId) {
        return `ERROR, producto con id ${id} no encontrado`;
      }
      return productId;
    } catch (error) {
      console.error("Error al buscar producto por ID: ", error);
      return null;
    }
  }
  async getByName(name) {
    try {
      if (!fs.existsSync(this.#productsPath))
        return "ERROR, el archivo no existe";
      let data = await fs.promises.readFile(this.#productsPath, "utf-8");
      let products = JSON.parse(data);
      const productName = products.find((product) => product.title === name);
      if (!productName) {
        return `ERROR, producto con id ${name} no encontrado`;
      }
      return productName;
    } catch (error) {
      console.error("Error al buscar producto por Name: ", error);
      return null;
    }
  }
  async getByCategory(productCategory) {
    try {
      if (!fs.existsSync(this.#productsPath))
        return "ERROR, el archivo no existe";
      let data = await fs.promises.readFile(this.#productsPath, "utf-8");
      let products = JSON.parse(data);
      const regex = new RegExp(`^${productCategory}$`, "i");
      const filteredProducts = products.filter((product) =>
        regex.test(product.category)
      );
      if (filteredProducts.length === 0) {
        return `ERROR, productos con categoria ${productCategory} no encontrados`;
      }
      return filteredProducts;
    } catch (error) {
      console.error("Error al buscar productos por Category: ", error);
      return null;
    }
  }
  async getCategories() {
    try {
      if (!fs.existsSync(this.#productsPath))
        return "ERROR, el archivo no existe";
      let data = await fs.promises.readFile(this.#productsPath, "utf-8");
      let products = JSON.parse(data);
      let categories = new Set();
      products.forEach((product) => {
        if (product.category) {
          categories.add(product.category);
        }
      });
      return Array.from(categories);
    } catch (error) {
      console.error("Error al obtener las categorías: ", error);
      return null;
    }
  }
  async update(id, updatedProduct) {
    try {
      if (!fs.existsSync(this.#productsPath)) {
        return "ERROR, el archivo no existe";
      }

      let data = await fs.promises.readFile(this.#productsPath, "utf-8");
      let products = JSON.parse(data);

      let index = products.findIndex(
        (product) => product.id === parseInt(id, 10)
      );
      if (index === -1) {
        return `ERROR, producto con id ${id} no encontrado`;
      }

      // Mantener el ID del producto original y actualizar los otros campos
      products[index] = {
        ...products[index],
        ...updatedProduct,
        id: products[index].id,
      };

      await fs.promises.writeFile(
        this.#productsPath,
        JSON.stringify(products, null, 2)
      );

      return products[index];
    } catch (error) {
      console.error("Error al actualizar producto:", error);
      return null;
    }
  }
  async delete(id) {
    try {
      if (!fs.existsSync(this.#productsPath)) {
        return "ERROR, el archivo no existe";
      }

      let data = await fs.promises.readFile(this.#productsPath, "utf-8");
      let products = JSON.parse(data);

      const newProducts = products.filter(
        (product) => product.id !== parseInt(id, 10)
      );
      if (newProducts.length === products.length) {
        return `ERROR, producto con id ${id} no encontrado`;
      }

      await fs.promises.writeFile(
        this.#productsPath,
        JSON.stringify(newProducts, null, 2)
      );

      return `Producto con id ${id} eliminado correctamente`;
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      return null;
    }
  }
}

export default ProductFileDao;
