import { Router } from "express";
import { methods as UserController } from "../controllers/db.user.controller.js";

const router = Router();



router.get("/", UserController.getUser);
router.post("/", UserController.addUser);
router.put("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);



export default router;