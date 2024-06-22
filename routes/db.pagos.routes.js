import { Router } from "express";
import { methods as PagosController } from "../controllers/db.pagos.controller.js";

const router = Router();



router.get("/", PagosController.getPagos);
router.post("/", PagosController.addPagos);
router.put("/:id", PagosController.updatePagos);
router.delete("/:id", PagosController.deletePagos);



export default router;