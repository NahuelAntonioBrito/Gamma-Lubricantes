import { Router } from "express";
import HistoryController from "../controllers/history.controller.js";
const router = Router();

router.get("/", HistoryController.getHistory);

router.post("/:clientId", HistoryController.addHistoryToClient);

router.put("/:historyId", HistoryController.updateHistory);

router.delete("/:historyId/:clientId", HistoryController.deleteHistory);

export default router;
