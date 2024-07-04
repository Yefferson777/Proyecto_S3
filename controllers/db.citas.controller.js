import { getConnection } from "../database/database";

const getCitas = async (req, res) => {
    let connection;
    try {
        connection = await getConnection();
        const result = await connection.query("SELECT * FROM cita");
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    } 
}