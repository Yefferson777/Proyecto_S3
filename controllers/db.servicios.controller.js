import { getConnection } from "./../database/database.js";

const getServicio= async(req, res) =>{

    try{
        const connection= await getConnection();
        const result=await connection.query("SELECT * FROM servicio");
        res.json(result);
            }catch(error) {
            res.status(500);
            res.send(error.message);
    }
    
    };

    const addServicio= async(req, res) =>{
        try{
            const { name, price_uni, status } = req.body;
            if (metodo == undefined || name == undefined ){
                res.status(400).json({ message: "Bad Request. Please fill all field." });
            }
            const servicio={ name, price_uni, status};
            const connection = await getConnection();
            const result = await connection.query("INSERT INTO servicios SET ?", servicio);
            res.json(result);
        } catch(error) {
                res.status(500);
                res.send(error.message);
        }
        
        };

        const updateServicio = async (req, res) => {
            try {
                const { id } = req.params;
                const { name, price_uni, status } = req.body;
        
                if (name === undefined || price_uni === undefined, status === undefined) {
                    res.status(400).json({ message: "Bad Request. Please fill all field." });
                }
        
                const servicio = { name, price_uni, status };
                const connection = await getConnection();
                const result = await connection.query("UPDATE servicios SET ? WHERE servicio_id = ?", [id]);
                res.json(result);
    
            } catch (error) {
                res.status(500);
                res.send(error.message);
            }
        };

        const deleteServicio= async(req, res) =>{

            try{
                const { id } = req.params;
                const connection= await getConnection();
                const result=await connection.query("DELETE FROM servicios WHERE servicio_id = ?", id);
                res.json(result);
                    }catch(error) {
                    res.status(500);
                    res.send(error.message);
            }
            
            };

    export const methods ={
        getServicio,
        addServicio,
        updateServicio,
        deleteServicio
        };