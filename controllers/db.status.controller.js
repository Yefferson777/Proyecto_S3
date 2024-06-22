import { getConnection } from "./../database/database.js";

const getStatus= async(req, res) =>{

    try{
        const connection= await getConnection();
        const result=await connection.query("SELECT * FROM status");
        res.json(result);
            }catch(error) {
            res.status(500);
            res.send(error.message);
    }
    
    };

    const addStatus= async(req, res) =>{
        try{
            const { name } = req.body;
            if (name == undefined ){
                res.status(400).json({ message: "Bad Request. Please fill all field." });
            }
            const status={ name,};
            const connection = await getConnection();
            const result = await connection.query("INSERT INTO status SET ?", status);
            res.json(result);
        } catch(error) {
                res.status(500);
                res.send(error.message);
        }
        
        };

        const updateStatus = async (req, res) => {
            try {
                const { id } = req.params;
                const { name } = req.body;
        
                if (name === undefined ) {
                    res.status(400).json({ message: "Bad Request. Please fill all field." });
                }
        
                const status = { name };
                const connection = await getConnection();
                const result = await connection.query("UPDATE status SET ? WHERE status_id = ?", [status, id]);
                res.json(result);
    
            } catch (error) {
                res.status(500);
                res.send(error.message);
            }
        };

        const deleteStatus= async(req, res) =>{

            try{
                const { id } = req.params;
                const connection= await getConnection();
                const result=await connection.query("DELETE FROM status WHERE status_id = ?", id);
                res.json(result);
                    }catch(error) {
                    res.status(500);
                    res.send(error.message);
            }
            
            };

    export const methods ={
        getStatus,
        addStatus,
        updateStatus,
        deleteStatus
        };