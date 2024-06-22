import { getConnection } from "./../database/database.js";

const getUser = async (req, res) => {
    let connection;
    try {
        connection = await getConnection();
        const result = await connection.query("SELECT * FROM user");
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    } 
};

const addUser= async (req, res) => {
    let connection;
    try {
        const { id } = req.params;
        connection = await getConnection();
        const result = await connection.query("SELECT * FROM user WHERE user_id = ?", [id]);
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const updateUser = async (req, res) => {
    let connection;
    try {
        const { nombre, apellido, is_admin, is_active, create_at } = req.body;
        if (nombre === undefined || apellido === undefined || is_admin === undefined || is_active === undefined || create_at === undefined) {
            return res.status(400).json({ message: "Bad Request. Please fill all fields." });
        }
        const user = { nombre, apellido, is_admin, is_active, create_at};
        connection = await getConnection();
        const result = await connection.query("INSERT INTO user SET ?", user);
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    } 
};

const deleteUser = async (req, res) => {
    let connection;
    try {
        const { id } = req.params;
        const { nombre, apellido, is_admin, is_active, create_at } = req.body;

        if (nombre === undefined || apellido === undefined || is_admin === undefined || is_active === undefined || create_at === undefined) {
            return res.status(400).json({ message: "Bad Request. Please fill all fields." });
        }
        const user = { nombre, apellido, is_admin, is_active, create_at};
        connection = await getConnection();
        const result = await connection.query("UPDATE user SET ? WHERE user_id = ?", [user, id]);
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    } 
};



export const methods = {
getUser,
addUser,
updateUser,
deleteUser
};
