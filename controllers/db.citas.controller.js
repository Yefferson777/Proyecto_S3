import { getConnection } from "./../database/database.js";

const addCita = async (req, res) => {
    let connection;
    try {
        const { nombre, apellido, numb, fecha, hora, servicios, price, metodo, name, monto, ref } = req.body;

        if (!nombre || !apellido || !numb || !fecha || !hora || !servicios || servicios.length === 0 || !metodo || !name || !monto || !ref) {
            return res.status(400).json({ message: "Bad Request. Please fill all fields." });
        }

        connection = await getConnection();

        // Primero, buscar o crear el cliente
        let [client] = await connection.query("SELECT * FROM clients WHERE nombre = ? AND apellido = ? AND numb = ?", [nombre, apellido, numb]);
        if (!client || client.length === 0) {
            // Crear nuevo cliente
            const result = await connection.query("INSERT INTO clients (nombre, apellido, numb) VALUES (?, ?, ?)", [nombre, apellido, numb]);
            client = { client_id: result.insertId, nombre, apellido, numb };
        } else {
            client = client[0];
        }

        // Crear cita para el cliente
        const cita = { client_id: client.client_id, date_at: fecha, time_at: hora, price: price };
        const result = await connection.query("INSERT INTO cita (client_id, date_at, time_at, price) VALUES (?, ?, ?, ?)", [cita.client_id, cita.date_at, cita.time_at, cita.price]);
        const citaId = result.insertId;

        // Insertar los servicios seleccionados en la tabla intermedia cita_servicios
        for (const servicioId of servicios) {
            await connection.query("INSERT INTO cita_servicios (cita_id, servicio_id) VALUES (?, ?)", [citaId, servicioId]);
        }

        // Insertar los datos de pago en la tabla pagos
        const pago = { metodo, name, monto, ref };
        const pagoResult = await connection.query("INSERT INTO pagos (metodo, name, monto, ref) VALUES (?, ?, ?, ?)", [pago.metodo, pago.name, pago.monto, pago.ref]);
        const pagoId = pagoResult.insertId;

        // Insertar en la tabla pago_citas
        await connection.query("INSERT INTO pago_citas (cita_id, pago_id) VALUES (?, ?)", [citaId, pagoId]);

        res.json({ message: "Cita y pago creados correctamente" });
    } catch (error) {
        res.status(500).send(error.message);
        console.log(error);
    }
};

export const methods = {
    addCita
};
