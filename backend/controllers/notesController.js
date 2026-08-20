const db=require("../config/database");
const {isValid}=require("../middleware/validation");

async function getNotes(req, res,next) {
    try {
        const [rows] = await db.query(
            "SELECT * FROM NOTES"
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
            `INSERT INTO NOTES (TITLE,SUBJECT,DESCRIPTION)
            VALUES(?,?,?)`, [title, subject, description]

        );

        const [rows] = await db.query(
            "SELECT * FROM NOTES WHERE ID =?", [result.insertId]
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
            "DELETE FROM NOTES WHERE ID=?", [id]
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
            `SELECT * fROM notes where id=?`,[notesId]
        );

        if(existing.length===0){
            return res.status(404).json(
                {
                    message:"Note not found"
                }
            );
        }

        await db.query(
            `Update notes
            set title=?, subject=?,description=?
            where id=?`,
            [title,subject,description,notesId]
        );

        const [rows]=await db.query(
            "Select * from notes  where id=?",[notesId]
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