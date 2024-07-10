import { Router } from "express";
import productModel from "../dao/models/products.model.js";
import ProductsController from "../controllers/products.controller.js";

const router = Router();

router.get("/", ProductsController.getProducts);

router.get("/name", ProductsController.getByName);

router.get("/category/:productCategory", ProductsController.getByCategory);

router.get("/:id", ProductsController.getById);

router.post("/", ProductsController.addProduct);

router.put("/:id", ProductsController.updateProduct);

router.delete("/:id", ProductsController.deleteProduct);

export default router;
