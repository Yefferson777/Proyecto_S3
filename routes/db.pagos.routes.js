import { Router } from "express";
import { methods as PagosController } from "../controllers/db.pagos.controller.js";

const router = Router();

router.get("/", PagosController.getPagos);
router.post("/:id", PagosController.addPagos);

export default router;