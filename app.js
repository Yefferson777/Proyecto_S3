import express from "express";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import indexRouter from "./indexRouter.js";
import dbclients from "./routes/db.clients.routes.js";
import dbpagos from "./routes/db.pagos.routes.js";
import dbservicios from "./routes/db.servicios.routes.js";
import dbstatus from "./routes/db.status.routes.js";
import dbuser from "./routes/db.user.routes.js";

// Obtén la ruta del directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Static
app.use(express.static(path.join(__dirname, "public")));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Settings
app.set("port", 4000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Middlewares
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use('/', indexRouter);
app.use("/api/clients", dbclients);
app.use("/api/pagos", dbpagos);
app.use("/api/servicios", dbservicios); // No es necesario añadir multer aquí
app.use("/api/status", dbstatus);
app.use("/api/user", dbuser);

export default app;
