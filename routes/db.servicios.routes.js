import { Router } from "express";
import { methods as ServiciosController } from "../controllers/db.servicios.controller.js";
import multer from "multer";
import path from "path";

// Configuración de multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Directorio donde se guardarán las imágenes
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Nombre del archivo será la fecha actual + extensión original
    }
});

const upload = multer({ storage: storage });

const router = Router();

router.get("/", ServiciosController.getServicios);
router.post("/", upload.single('image'), ServiciosController.addServicios); // Añadir middleware de multer
router.post("/servicios", upload.single('image'), ServiciosController.addServicios); // Añadir middleware de multer
router.put("/:id", upload.single('image'), ServiciosController.updateServicios); // Añadir middleware de multer si se permite actualizar la imagen
router.delete("/:id", ServiciosController.deleteServicios);

export default router;
