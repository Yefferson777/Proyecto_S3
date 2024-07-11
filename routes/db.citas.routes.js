import { Router } from "express";
import { methods as CitaController } from "../controllers/db.citas.controller.js";

const router = Router();

router.post("/", CitaController.addCita);
router.get("/:date", CitaController.getcitasbydate);
router.get("/", CitaController.getcitas);


export default router;


