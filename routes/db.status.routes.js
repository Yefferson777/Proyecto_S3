import { Router } from "express";
import { methods as StatusController } from "../controllers/db.status.controller.js";

const router = Router();



router.get("/", StatusController.getStatus);
router.post("/", StatusController.addStatus);
router.put("/:id", StatusController.updateStatus);
router.delete("/:id", StatusController.deleteStatus);



export default router;