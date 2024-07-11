import { Router } from "express";
import { methods as CitaController } from "../controllers/db.citas.controller.js";

const router = Router();

router.post("/", CitaController.addCita);

export default router;


