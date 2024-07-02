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
}

export default new ProductController();
