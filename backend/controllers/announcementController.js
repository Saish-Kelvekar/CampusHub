const db=require("../config/database");
const {isValid}=require("../middleware/validation");

async function getAnnouncements(req, res,next) {
    try {
        const [rows] = await db.query(
            "SELECT * FROM ANNOUNCEMENTS"
        );

        res.json(rows);
    } catch (error) {
        next(error);
    }
};


async function createAnnouncement(req, res,next) {


    try {
        const { title, date, description } = req.body;
        
        const [result] = await db.query(
            `INSERT INTO ANNOUNCEMENTS (title,date,description)
            VALUES(?,?,?)`,
            [title, date, description]
        );

        const [rows] = await db.query(
            "SELECT * FROM ANNOUNCEMENTS WHERE ID=?", [result.insertId]
        );
        res.status(201).json(rows[0]);
    } catch (error) {
        next(error);
    }
}


async function updateAnnouncement(req,res,next){
    
    try{
        
        
        const id = Number(req.params.id);

        if(!isValid(id)){
            return res.status(400).json(
                {
                    message:"Invalid ID"
                }
            );
        }
        const { title, date, description } = req.body;
        
        

        const [existing] = await db.query(
            `SELECT * FROM announcements
             WHERE id = ?`,
            [ id]
        );

       

        if (existing.length === 0) {
            

            return res.status(404).json({
                message: "Announcement not found"
            });
        }
        await db.query(
            `UPDATE announcements
            SET title=?,date=?,description=?
            WHERE id=?`,[title,date,description,id]
        );
        

        const [rows] = await db.query(
            "SELECT * FROM announcements WHERE id = ?",
            [id]
        );

        

        res.json(rows[0]);
    }catch(error){
        next(error);
    }
};


async function deleteAnnouncement(req, res,next)  {
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
            "DELETE FROM ANNOUNCEMENTS WHERE ID=?", [id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Announcement not found"
            });
        }


        res.json({
            message: "Announcement deleted successfully"
        });
    } catch (error) {
        next(error);
    }
}
module.exports ={
    getAnnouncements,
    createAnnouncement,
    deleteAnnouncement,
    updateAnnouncement
};