import { getConnection } from "./../database/database.js";

const addCita = async (req, res) => {
    let connection;
    try {
        const { nombre, fecha, hora, servicios } = req.body;

        if (!nombre || !fecha || !hora || !servicios) {
            return res.status(400).json({ message: "Bad Request. Please fill all fields." });
        }

        connection = await getConnection();

        // Primero, buscar o crear el cliente
        let [client] = await connection.query("SELECT * FROM clients WHERE nombre = ?", [nombre]);
        if (!client) {
            // Crear nuevo cliente
            const result = await connection.query("INSERT INTO clients (nombre) VALUES (?)", [nombre]);
            client = { id: result.insertId, nombre };
        }

        // Crear cita para cada servicio seleccionado
        for (const servicio of JSON.parse(servicios)) {
            const { id, price } = servicio;
            const cita = { client_id: client.id, date_at: fecha, time_at: hora, servicio_id: id, price, pagos_id: 1, status_id: 1 }; // pagos_id y status_id predeterminados
            await connection.query("INSERT INTO cita SET ?", cita);
        }

        res.json({ message: "Cita creada correctamente" });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const methods = {
    addCita
};
