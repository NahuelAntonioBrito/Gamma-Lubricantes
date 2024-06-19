import { Router } from "express";
import ClientController from "../controllers/clients.controller.js";

const router = Router();

router.get("/", ClientController.getClients);

router.get("/inactivos", ClientController.getInactiveClients);

router.get("/:clientId", ClientController.getClientById);

router.post("/", ClientController.addClient);

router.put("/:id", ClientController.updateClient);

router.delete("/:id", ClientController.deleteClient);

export default router;
