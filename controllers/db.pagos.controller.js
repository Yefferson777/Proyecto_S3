import { getConnection } from "./../database/database.js";

const getPagos= async(req, res) =>{

    try{
        const connection= await getConnection();
        const result=await connection.query("SELECT * FROM pagos");
        res.json(result);
            }catch(error) {
            res.status(500);
            res.send(error.message);
    }
    
    };

    export const methods ={
        getPagos
        };