import { Router } from "express";
import productModel from "../models/products.model.js";
import ProductsController from "../controllers/products.controller.js";

const router = Router();

router.get("/", ProductsController.getProducts);

router.post("/", ProductsController.addProduct);

router.put("/:id", ProductsController.updateProduct);

router.delete("/:id", ProductsController.deleteProduct);

export default router;
