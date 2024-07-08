import { getConnection } from "./../database/database.js";

const getStatus = async (req, res) => {
    let connection;
    try {
        connection = await getConnection();
        const result = await connection.query("SELECT * FROM status");
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    } 
};

const getState= async (req, res) => {
    let connection;
    try {
        const { id } = req.params;
        connection = await getConnection();
        const result = await connection.query("SELECT * FROM status WHERE status_id = ?", [id]);
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const addStatus = async (req, res) => {
    let connection;
    try {
        const { name } = req.body;
        if (name === undefined) {
            return res.status(400).json({ message: "Bad Request. Please fill all fields." });
        }
        const status = { name};
        connection = await getConnection();
        const result = await connection.query("INSERT INTO status SET ?", status);
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    } 
};

const updateStatus = async (req, res) => {
    let connection;
    try {
        const { id } = req.params;
        const { name } = req.body;

        if (name === undefined) {
            return res.status(400).json({ message: "Bad Request. Please fill all fields." });
        }
        const status = { name};
        connection = await getConnection();
        const result = await connection.query("UPDATE status SET ? WHERE status_id = ?", [status, id]);
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    } 
};

const deleteStatus = async (req, res) => {
    let connection;
    try {
        const { id } = req.params;
        connection = await getConnection();
        const result = await connection.query("DELETE FROM status WHERE status_id = ?", [id]);
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    } 
};

export const methods = {
getStatus,
getState,
addStatus,
deleteStatus,
updateStatus
};
