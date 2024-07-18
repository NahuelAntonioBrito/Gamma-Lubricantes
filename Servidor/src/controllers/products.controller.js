import productModel from "../dao/models/products.model.js";
import { ProductService } from "../services/repositories/index.js";

class ProductController {
  async getProducts(req, res) {
    try {
      const products = await ProductService.getAll(req);
      res.json({ products });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const productId = req.params.id;
      const product = await ProductService.getById(productId);
      if (!product) {
        return res.status(404).json({ message: "Producto no encontrado" });
      }
      res.json({ product });
    } catch (error) {
      res.status(500).json({ message: "Error al obtener el producto", error });
    }
  }

  async getByName(req, res) {
    try {
      const productName = req.query.productName;
      const products = await ProductService.getByName(productName);
      res.json({ products });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getByCategory(req, res) {
    try {
      const category = req.params.productCategory;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 12;

      const { products, totalPages, currentPage, totalProducts } =
        await ProductService.getByCategory(category, page, limit);

      res.status(200).json({
        products,
        totalPages,
        currentPage,
        totalProducts,
      });
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({
        message: "Error fetching products",
        error: error.message || error,
      });
    }
  }

  async getCategories(req, res) {
    try {
      const categories = await ProductService.getCategories();
      console.log("categories: ", categories);
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ message: "Error fetching categories", error });
    }
  }

  async addProduct(req, res) {
    try {
      const newProductData = req.body;
      const newProduct = await ProductService.create(newProductData);
      res.status(201).json({ product: newProduct });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateProduct(req, res) {
    try {
      const productId = req.params.id;
      const updatedProductData = req.body;

      const updatedProduct = await ProductService.update(
        productId,
        updatedProductData
      );

      if (!updatedProduct) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }

      res.json({ product: updatedProduct });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteProduct(req, res) {
    try {
      const productId = req.params.id;
      const deletedProduct = await ProductService.delete(productId);

      if (!deletedProduct) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }

      res.json({ message: "Producto eliminado", product: deletedProduct });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getPaginatedProducts(req, res) {
    const { page, limit } = req.query;

    try {
      const paginatedProducts = await ProductService.getPaginated(
        parseInt(page, 10) || 1,
        parseInt(limit, 10) || 12
      );
      res.status(200).json(paginatedProducts);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener productos paginados" });
    }
  }
}

export default new ProductController();
