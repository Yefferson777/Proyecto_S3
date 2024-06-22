import { getConnection } from "./../database/database.js";

const getClients = async (req, res) => {
    let connection;
    try {
        connection = await getConnection();
        const result = await connection.query("SELECT * FROM clients");
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    } 
};

const getClient = async (req, res) => {
    let connection;
    try {
        const { id } = req.params;
        connection = await getConnection();
        const result = await connection.query("SELECT * FROM clients WHERE client_id = ?", [id]);
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const addClients = async (req, res) => {
    let connection;
    try {
        const { nombre, apellido, numb } = req.body;
        if (nombre === undefined || apellido === undefined || numb === undefined) {
            return res.status(400).json({ message: "Bad Request. Please fill all fields." });
        }
        const clients = { nombre, apellido, numb };
        connection = await getConnection();
        const result = await connection.query("INSERT INTO clients SET ?", clients);
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    } 
};

const updateClient = async (req, res) => {
    let connection;
    try {
        const { id } = req.params;
        const { nombre, apellido, numb } = req.body;

        if (nombre === undefined || apellido === undefined || numb === undefined) {
            return res.status(400).json({ message: "Bad Request. Please fill all fields." });
        }
        const clients = { nombre, apellido, numb };
        connection = await getConnection();
        const result = await connection.query("UPDATE clients SET ? WHERE client_id = ?", [clients, id]);
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    } 
};

const deleteClients = async (req, res) => {
    let connection;
    try {
        const { id } = req.params;
        connection = await getConnection();
        const result = await connection.query("DELETE FROM clients WHERE client_id = ?", [id]);
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    } 
};

export const methods = {
    getClients,
    addClients,
    deleteClients,
    updateClient,
    getClient
};
