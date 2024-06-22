import { Router } from "express";
import { methods as ServiciosController } from "../controllers/db.servicios.controller.js";

const router = Router()

router.get("/", ServiciosController.getServicio);
router.post("/", ServiciosController.addServicio);
router.put("/:id", ServiciosController.updateServicio);
router.delete("/:id", ServiciosController.deleteServicio);

export default router;