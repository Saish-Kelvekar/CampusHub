const db=require("../config/database");
const {isValid}=require("../middleware/validation");

async function getAnnouncements(req, res,next) {
    try {
        const [rows] = await db.query(
            "SELECT * FROM announcements WHERE user_id=?",[req.user.id]
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
            `INSERT INTO announcements (title,date,description,user_id)
            VALUES(?,?,?,?)`,
            [title, date, description,req.user.id]
        );

        const [rows] = await db.query(
            "SELECT * FROM announcements WHERE ID=? and user_id=?", [result.insertId,req.user.id]
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
             WHERE id = ? and user_id=?`,
            [ id,req.user.id]
        );

       

        if (existing.length === 0) {
            

            return res.status(404).json({
                message: "Announcement not found"
            });
        }
        await db.query(
            `UPDATE announcements
            SET title=?,date=?,description=?
            WHERE id=? and user_id=?`,[title,date,description,id,req.user.id]
        );
        

        const [rows] = await db.query(
            "SELECT * FROM announcements WHERE id = ? and user_id=?",
            [id,req.user.id]
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
            "DELETE FROM announcements WHERE ID=? and user_id=?", [id,req.user.id]
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