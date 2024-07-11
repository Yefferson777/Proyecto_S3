import { getConnection } from "./../database/database.js";

export const addCita = async (req, res) => {
    let connection;
    try {
        const { nombre, apellido, numb, fecha, hora, servicios, price, metodo, name, monto, ref, fechapago } = req.body;

        if (!nombre || !fechapago || !apellido || !numb || !fecha || !hora || !servicios || servicios.length === 0 || !metodo || !name || !monto || !ref) {
            return res.status(400).json({ message: "Bad Request. Please fill all fields." });
        }

        connection = await getConnection();

        // Buscar o crear el cliente
        let [clientResult] = await connection.query("SELECT * FROM clients WHERE nombre = ? AND apellido = ? AND numb = ?", [nombre, apellido, numb]);
        let client;
        if ( !clientResult|| clientResult.length === 0) {
            // Crear nuevo cliente si no existe
            const result = await connection.query("INSERT INTO clients (nombre, apellido, numb) VALUES (?, ?, ?)", [nombre, apellido, numb]);
            client = { client_id: result.insertId, nombre, apellido, numb };
        } else {
            client = clientResult[0]; // Usar el primer cliente encontrado
        }

        // Crear cita para el cliente
        const cita = { client_id: client.client_id, date_at: fecha, time_at: hora, price };
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

        // Relacionar el pago con la cita
        await connection.query("INSERT INTO pago_citas (cita_id, pago_id) VALUES (?, ?)", [citaId, pagoId]);

        // Relacionar el pago con los servicios
        for (const servicioId of servicios) {
            await connection.query("INSERT INTO pago_servicio (pagos_id, servicio_id) VALUES (?, ?)", [pagoId, servicioId]);
        }

        res.status(201).json({ message: "Cita y pago creados correctamente", citaId });
    } catch (error) {
        res.status(500).send(error.message);
        console.error(error);

    }
};

export const getcitas = async (req, res) => {
    let connection;
    try {
        connection = await getConnection();
        const [citasResult] = await connection.query("SELECT * FROM cita");
        const [citasServiciosResult] = await connection.query("SELECT * FROM cita_servicios");

        // Formatear las citas con sus servicios asociados
        const citas = citasResult.map(cita => {
            const servicios = citasServiciosResult.filter(servicio => servicio.cita_id === cita.cita_id);
            return { ...cita, servicios };
        });

        res.json(citas);
    } catch (error) {
        res.status(500).send(error.message);
        console.error(error);
    } 
};

export const getcitasbydate = async (req, res) => {
    let connection;
    try {
        connection = await getConnection();
        const { date } = req.params;
        const [citasResult] = await connection.query("SELECT * FROM cita WHERE date_at = ?", [date]);
console.log(citasResult);
        res.json(citasResult);
    } catch (error) {
        res.status(500).send(error.message);
        console.error(error);
    } 
};

export const methods = {
    addCita,
    getcitasbydate,
    getcitas
};
