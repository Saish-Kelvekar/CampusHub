const db=require("../config/database");
const {isValid}=require("../middleware/validation");

async function getNotes(req, res,next) {
    try {
        const [rows] = await db.query(
            "SELECT * FROM notes WHERE  user_id=?",[req.user.id]
        );
        res.json(rows);
    }
    catch (error) {
        next(error);
    }
};

async function createNote(req, res,next){
    try {
        const { title, subject, description } = req.body;
        
        const [result] = await db.query(
            `INSERT INTO notes (TITLE,SUBJECT,DESCRIPTION,user_id)
            VALUES(?,?,?,?)`, [title, subject, description,req.user.id]

        );

        const [rows] = await db.query(
            "SELECT * FROM notes WHERE ID =? and user_id=?", [result.insertId,req.user.id]
        );

        res.status(201).json(rows[0]);
    }
    catch (error) {
        next(error);
    }


};

async function deleteNote(req, res,next) {
    try {
        const id = Number(req.params.id);
        if(!isValid(id)){
            return res.status(400).json(
                {
                    message:"Invalid ID"
                }
            );
        }
        const [result] = await db.query(
            "DELETE FROM notes WHERE ID=? and user_id=?", [id,req.user.id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Note not found"
            });
        }



        res.json({
            message: "Notes deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

async function updateNote(req,res,next){
    try {
        const notesId=Number(req.params.id);
        if(!isValid(notesId)){
            return res.status(400).json(
                {
                    message:"Invalid ID"
                }
            );
        }
        const {title,subject,description}=req.body;
        
        const [existing]=await db.query(
            `SELECT * FROM notes WHERE id=? and user_id=?`,[notesId,req.user.id]
        );

        if(existing.length===0){
            return res.status(404).json(
                {
                    message:"Note not found"
                }
            );
        }

        await db.query(
            `UPDATE notes
            SET title=?, subject=?,description=?
            WHERE id=? and user_id=?`,
            [title,subject,description,notesId,req.user.id]
        );

        const [rows]=await db.query(
            "SELECT * FROM notes WHERE id=? and user_id=?",[notesId,req.user.id]
        );

        res.json(rows[0]);
    } catch (error) {
        next(error);
    }
};

module.exports={
    getNotes,
    createNote,
    deleteNote,
    updateNote
}