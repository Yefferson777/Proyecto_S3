import { Router } from "express";
import { methods as ClientsController } from "../controllers/db.clients.controller.js";

const router = Router();

router.get("/", ClientsController.getClients);
router.get("/:id", ClientsController.getClient);
router.delete("/:id", ClientsController.deleteClients);
router.post("/", ClientsController.addClients);
router.put("/:id", ClientsController.updateClient);

export default router;

