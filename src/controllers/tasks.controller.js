const pool = require('../db')

const getAllTasks = async (req, res, next) => {
    try {
        const allTasks = await pool.query('SELECT * FROM task')
        console.log(allTasks)
        res.json(allTasks.rows)
    } catch(error){
        next(error);
    }

//   res.send("retriven a list of tasks");
  // const result = await pool.query('select now()')
  // res.json(result.rows[0])
};

const getSingleTask = async (req, res, next) => {

    try{
        const {id} = req.params
        const task = await pool.query('SELECT * FROM task WHERE id=$1',[id])
    
        if (task.rows.length === 0) 
            return res.status(404).json({
            mesage: "Task not found"
        })
    
        res.json(task.rows)
    }catch(error){
        next(error);
    }

};

const createTask = async (req, res, next) => {
    const {title, description} = req.body;

    try{
        const result = await pool.query("INSERT INTO task (title, description) VALUES ($1, $2) RETURNING *", [
            title, description]
        );
        res.send(result.rows[0]);
    }catch(error){
        next(error);
        // console.log(error.message);
        // res.json({error: error.message});
    }
};

const deleteTask = async (req, res, next) => {
    
    try {
        const {id} = req.params
        const result = await pool.query('DELETE FROM task WHERE id=$1',[id])
        
        if (result.rowCount === 0) 
            return res.status(404).json({
            mesage: "Task not found"
        });
        
        return res.sendStatus(204);
    }catch(error){
        next(error)
    }


};

const updateTask = async (req, res, next) => {

    try{
        const {id} = req.params
        const {title, description} = req.body
    
        const result = await pool.query(
            "UPDATE task SET title = $1, description = $2 WHERE id = $3 RETURNING *",
            [title, description, id]
        );
        if (result.rows.length === 0)
            return res.status(404).json({
                message: "Task not found"
        });
        return res.json(result.rows[0]);
    } catch(error){
        next(error)
    }
};

module.exports = {
    getAllTasks,
    getSingleTask,
    createTask,
    deleteTask,
    updateTask,
};
