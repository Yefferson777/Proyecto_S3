import { getConnection } from "./../database/database.js";

const getUser= async(req, res) =>{

    try{
        const connection= await getConnection();
        const result=await connection.query("SELECT * FROM user");
        res.json(result);
            }catch(error) {
            res.status(500);
            res.send(error.message);
    }
    
    };

    const addUser= async(req, res) =>{
        try{
            const { nombre, apellido, is_admin, is_active, create_at } = req.body;
            if (nombre == undefined, apellido == undefined, is_admin == undefined, is_active == undefined, create_at == undefined){
                res.status(400).json({ message: "Bad Request. Please fill all field." });
            }
            const user={ nombre, apellido, is_admin, is_active, create_at};
            const connection = await getConnection();
            const result = await connection.query("INSERT INTO user SET ?", user);
            res.json(result);
        } catch(error) {
                res.status(500);
                res.send(error.message);
        }
        
        };

        const updateUser = async (req, res) => {
            try {
                const { id } = req.params;
                const { nombre, apellido, is_admin, is_active, create_at } = req.body;
        
                if (nombre === undefined, apellido == undefined, is_admin == undefined, is_active == undefined, create_at == undefined ) {
                    res.status(400).json({ message: "Bad Request. Please fill all field." });
                }
        
                const user = { nombre };
                const connection = await getConnection();
                const result = await connection.query("UPDATE user SET ? WHERE user_id = ?", [id]);
                res.json(result);
    
            } catch (error) {
                res.status(500);
                res.send(error.message);
            }
        };

        const deleteUser= async(req, res) =>{

            try{
                const { id } = req.params;
                const connection= await getConnection();
                const result=await connection.query("DELETE FROM user WHERE user_id = ?", id);
                res.json(result);
                    }catch(error) {
                    res.status(500);
                    res.send(error.message);
            }
            
            };

    export const methods ={
        getUser,
        addUser,
        updateUser,
        deleteUser
        };