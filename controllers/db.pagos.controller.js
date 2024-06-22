import { getConnection } from "./../database/database.js";

const getPagos = async (req, res) => {
    let connection;
    try {
        connection = await getConnection();
        const result = await connection.query("SELECT * FROM pagos");
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    } 
};

const getPago = async (req, res) => {
    let connection;
    try {
        const { id } = req.params;
        connection = await getConnection();
        const result = await connection.query("SELECT * FROM pagos WHERE pagos_id = ?", [id]);
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const addPagos = async (req, res) => {
    let connection;
    try {
        const { metodo, name } = req.body;
        if (metodo === undefined || name === undefined) {
            return res.status(400).json({ message: "Bad Request. Please fill all fields." });
        }
        const pagos = { metodo, name};
        connection = await getConnection();
        const result = await connection.query("INSERT INTO pagos SET ?", pagos);
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
getPago,
addPagos,
updatePagos,
deletePagos

};
