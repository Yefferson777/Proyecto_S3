import { getConnection } from "./../database/database.js";

const getPagos = async (req, res) => {
    let connection;
    try {
        connection = await getConnection();
        // Consulta para obtener los pagos y sus servicios correspondientes
        const result = await connection.query(`
            SELECT 
                p.pagos_id,
                p.metodo,
                p.name AS pago_name,
                p.date_at,
                p.monto,
                p.ref,
                s.servicio_id,
                s.name AS servicio_name,
                s.price_uni,
                s.status,
                s.image
            FROM pagos p
            LEFT JOIN pago_servicio ps ON p.pagos_id = ps.pagos_id
            LEFT JOIN servicio s ON ps.servicio_id = s.servicio_id
        `);

        // Transformar el resultado en un formato adecuado
        const pagos = result.reduce((acc, row) => {
            const { pagos_id, metodo, pago_name, date_at, monto, ref, servicio_id, servicio_name, price_uni, status, image } = row;
            const pagoIndex = acc.findIndex(p => p.pagos_id === pagos_id);
            const servicio = { servicio_id, servicio_name, price_uni, status, image };

            if (pagoIndex > -1) {
                acc[pagoIndex].servicios.push(servicio);
            } else {
                acc.push({
                    pagos_id,
                    metodo,
                    pago_name,
                    date_at,
                    monto,
                    ref,
                    servicios: servicio_id ? [servicio] : []
                });
            }

            return acc;
        }, []);

        res.json(pagos);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const getPagobydate = async (req, res) => {
    let connection;
    try {
        connection = await getConnection();
        //parametro de fecha en YYYY-MM-DD
        const { date } = req.params;
       
        console.log(date);
        const result = await connection.query("SELECT p.pagos_id, p.metodo, p.name AS pago_name, p.date_at, p.monto, p.ref, s.servicio_id,s.name AS servicio_name, s.price_uni, s.status, s.image FROM pagos p LEFT JOIN pago_servicio ps ON p.pagos_id = ps.pagos_id LEFT JOIN servicio s ON ps.servicio_id = s.servicio_id WHERE p.date_at = ?", [date]);
        
   
        const pagos = result.reduce((acc, row) => {
            const { pagos_id, metodo, pago_name, date_at, monto, ref, servicio_id, servicio_name, price_uni, status, image } = row;
            const pagoIndex = acc.findIndex(p => p.pagos_id === pagos_id);
            const servicio = { servicio_id, servicio_name, price_uni, status, image };

            if (pagoIndex > -1) {
                acc[pagoIndex].servicios.push(servicio);
            } else {
                acc.push({
                    pagos_id,
                    metodo,
                    name: pago_name,
                    date_at,
                    monto,
                    ref,
                    servicios: servicio_id ? [servicio] : []
                });
            }

            return acc;
        }, []);

        res.json(pagos);
    } catch (error) {
        res.status(500).send(error.message);
    } 
}

const getPagosbymonth = async (req, res) => {
    let connection;
    try {
        connection = await getConnection();
        // Parametro de fecha en YYYY-MM
        const { month } = req.params;
        
        // Destructurando el año y el mes del parámetro month
        const [year, monthNumber] = month.split('-');
        
        console.log(`Year: ${year}, Month: ${monthNumber}`);
        const result = await connection.query("SELECT * FROM pagos WHERE YEAR(date_at) = ? AND MONTH(date_at) = ?", [year, monthNumber]);
  
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    } 
}
  

const addPagos = async (req, res) => {
    let connection;
    try {
        const { metodo, name, fecha, servicios } = req.body;
        if (metodo === undefined || name === undefined || fecha === undefined){
            return res.status(400).json({ message: "Bad Request. Please fill all fields." });
        }
        const pagos = { metodo, name, date_at: fecha};
        connection = await getConnection();
        const result = await connection.query("INSERT INTO pagos SET ?", pagos);
                // Insertar los servicios en la tabla intermedia
                for (const servicioId of servicios) {
                    await connection.query("INSERT INTO pago_servicio (pagos_id, servicio_id) VALUES (?, ?)", [pagosId, servicioId]);
                }
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    } 
};

const updatePagos = async (req, res) => {
    let connection;
    try {
        const { id } = req.params;
        const { metodo, name} = req.body;

        if (metodo === undefined || name === undefined ) {
            return res.status(400).json({ message: "Bad Request. Please fill all fields." });
        }
        const pagos = { metodo, name};
        connection = await getConnection();
        const result = await connection.query("UPDATE pagos SET ? WHERE pagos_id = ?", [pagos, id]);
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    } 
};

const deletePagos = async (req, res) => {
    let connection;
    try {
        const { id } = req.params;
        connection = await getConnection();
        const result = await connection.query("DELETE FROM pagos WHERE pagos_id = ?", [id]);
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    } 
};

export const methods = {
getPagos,
getPagobydate,
getPagosbymonth,
addPagos,
updatePagos,
deletePagos

};
