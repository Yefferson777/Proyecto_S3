import { getConnection } from "./../database/database.js";

const addCita = async (req, res) => {
    let connection;
    try {
        const { nombre, apellido, numb, fecha, hora, servicios, price, metodo, name, monto, ref, fechapago } = req.body;

        if (!nombre || !fechapago || !apellido || !numb || !fecha || !hora || !servicios || servicios.length === 0 || !metodo || !name || !monto || !ref) {
            return res.status(400).json({ message: "Bad Request. Please fill all fields." });
        }

        connection = await getConnection();

        // Primero, buscar o crear el cliente
        const [clientResult] = await connection.query("SELECT * FROM clients WHERE nombre = ? AND apellido = ? AND numb = ?", [nombre, apellido, numb]);
        console.log(clientResult.client_id);
        let client;
        if (clientResult.length === 0) {
            // Crear nuevo cliente
            const result = await connection.query("INSERT INTO clients (nombre, apellido, numb) VALUES (?, ?, ?)", [nombre, apellido, numb]);
            client = { client_id: result.insertId, nombre, apellido, numb };
        } else {
            client = clientResult.client_id;
            console.log(client);
        }

        // Crear cita para el cliente
        const cita = { client_id: client, date_at: fecha, time_at: hora, price: price };
        const result = await connection.query("INSERT INTO cita (client_id, date_at, time_at, price) VALUES (?, ?, ?, ?)", [cita.client_id, cita.date_at, cita.time_at, cita.price]);
        const citaId = result.insertId;

        // Insertar los servicios seleccionados en la tabla intermedia cita_servicios
        for (const servicioId of servicios) {
            await connection.query("INSERT INTO cita_servicios (cita_id, servicio_id) VALUES (?, ?)", [citaId, servicioId]);
        }

        // Insertar los datos de pago en la tabla pagos
        const pago = { metodo, name, monto, ref, date_at: fechapago };
        const pagoResult = await connection.query("INSERT INTO pagos (metodo, name, monto, ref, date_at) VALUES (?, ?, ?, ?, ?)", [pago.metodo, pago.name, pago.monto, pago.ref, pago.date_at]);
        const pagoId = pagoResult.insertId;

        // Insertar en la tabla pago_citas
        await connection.query("INSERT INTO pago_citas (cita_id, pago_id) VALUES (?, ?)", [citaId, pagoId]);

        // Insertar en la tabla pago_servicio
        for (const servicioId of servicios) {
            await connection.query("INSERT INTO pago_servicio (pagos_id, servicio_id) VALUES (?, ?)", [pagoId, servicioId]);
        }

        res.json({ message: "Cita y pago creados correctamente" });
    } catch (error) {
        res.status(500).send(error.message);
        console.log(error);
    }
};

export const getcitas = async (req, res) => {
    let connection;
    try {
        connection = await getConnection();
        const result = await connection.query("SELECT * FROM cita");
        const citas = await connection.query("SELECT * FROM cita_servicios");

        res.json({ result, citas });
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export const getcitasbydate = async (req, res) => {
    let connection;
    try {
        connection = await getConnection();
        const { date } = req.params;
        const result = await connection.query("SELECT * FROM cita WHERE date_at = ?", [date]);

        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export const methods = {
    addCita,
    getcitasbydate,
    getcitas
};
