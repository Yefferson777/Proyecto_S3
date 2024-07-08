import { getConnection } from "./../database/database.js";

const getServicios = async (req, res) => {
    let connection;
    try {
        connection = await getConnection();
        const result = await connection.query("SELECT * FROM servicio");
        // Ajustar la URL de la imagen si es necesario
        result.forEach(servicio => {
            if (servicio.image) {
                servicio.image = `uploads/${servicio.image}`;
            }
        });
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const getServicio = async (req, res) => {
    let connection;
    try {
        const { id } = req.params;
        connection = await getConnection();
        const result = await connection.query("SELECT * FROM servicio WHERE servicio_id = ?", [id]);
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const addServicios = async (req, res) => {
    let connection;
    try {
        const { name, price_uni, status } = req.body;
        const image = req.file ? req.file.filename : null;

        if (name === undefined || price_uni === undefined || status === undefined) {
            return res.status(400).json({ message: "Bad Request. Please fill all fields." });
        }

        const servicios = { name, price_uni, status, image };
        connection = await getConnection();
        const result = await connection.query("INSERT INTO servicio SET ?", servicios);
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const updateServicios = async (req, res) => {
    let connection;
    try {
        const { id } = req.params;
        const { name, price_uni, status } = req.body;

        if (name === undefined || price_uni === undefined || status === undefined) {
            return res.status(400).json({ message: "Bad Request. Please fill all fields." });
        }

        const servicios = { name, price_uni, status };
        connection = await getConnection();
        const result = await connection.query("UPDATE servicio SET ? WHERE servicio_id = ?", [servicios, id]);
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const deleteServicios = async (req, res) => {
    let connection;
    try {
        const { id } = req.params;
        connection = await getConnection();
        const result = await connection.query("DELETE FROM servicio WHERE servicio_id = ?", [id]);
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const methods = {
    getServicios,
    getServicio,
    addServicios,
    updateServicios,
    deleteServicios
};
