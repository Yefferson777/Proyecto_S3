import { Router } from "express";
import { methods as ServiciosController } from "../controllers/db.servicios.controller.js";

const router = Router()

router.get("/", ServiciosController.getServicios);
router.post("/", ServiciosController.addServicios);
router.put("/:id", ServiciosController.updateServicios);
router.delete("/:id", ServiciosController.deleteServicios);

export default router;