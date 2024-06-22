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

    const addPagos= async(req, res) =>{
        try{
            const { metodo, name } = req.body;
            if (metodo == undefined || name == undefined ){
                res.status(400).json({ message: "Bad Request. Please fill all field." });
            }
            const pagos={ metodo, name};
            const connection = await getConnection();
            const result = await connection.query("INSERT INTO pagos SET ?", pagos);
            res.json(result);
        } catch(error) {
                res.status(500);
                res.send(error.message);
        }
        
        };

    export const methods ={
        getPagos,
        addPagos
        };