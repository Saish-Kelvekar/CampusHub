const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors")
const app = express();
app.use(cors());
app.use(express.json());//used for post reason  JSON---(parse)-->req.body
const PORT = 3000;

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "campushub"
});


/* <========CHECKING OF VALID ID========>*/
function isValid(id){
    return Number.isInteger(id) && id>0;
}


/* <<======VALID FIELD VALUES========>>*/
// function validateFields(fields){
//     for(const field of fields){
//         if(!field.trim()){
//             return false;
//         }
//     }
//     return true;
// }

/* <<=========MIDDLEWARE==========>>*/
// function validateAnnouncement(req,res,next){
//     const {title,date,description}=req.body;
//     if(!validateFields([title,date,description])){
//         return res.status(400).json({
//             message:"All fields are required"
//         });
//     }
//     next();
// }

function validateFieldsMiddleware(fields){
    return (req,res,next)=>{
        for(const field of fields){
            const value=req.body[field];
            if(!value?.trim()){
                return res.status(400).json({
                    message:`${field} is required`
                })
            }
        }
        next();
    }
}

const validateAnnouncement=validateFieldsMiddleware(["title","date","description"]);
const validateEvent=validateFieldsMiddleware(["title","date","location"]);
const validateNote=validateFieldsMiddleware(["title","subject","description"]);

async function testDatabase() {
    try {
        const [result] = await db.query("SELECT 1");
        console.log("MYSQL connected successfully", result);
    } catch (error) {
        console.error("MySql connection failed", error);
    }
}
testDatabase();

app.get("/", (req, res) => {//syntax (path,callback)
    res.send("welcome to CampusHub");
})


app.get("/api/announcements", async (req, res,next) => {
    try {
        const [rows] = await db.query(
            "SELECT * FROM ANNOUNCEMENTS"
        );

        res.json(rows);
    } catch (error) {
        next(error);
    }
});

app.post("/api/announcements",
        validateAnnouncement,
        async (req, res,next) => {


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
});


app.put("/api/announcements/:id",
    validateAnnouncement,
    async(req,res,next)=>{
    console.log("PUT ANNOUNCEMENT ROUTE HIT");
    try{
        
        // const id=Number(req.params.id);
        // const {title,date,description}=req.body;

        //  const [existing] = await db.query(
        //     "SELECT * FROM announcements WHERE id = ?",
        //     [id]
        // );

        // if (existing.length === 0) {
        //     return res.status(404).json({
        //         message: "Announcement not found"
        //     });
        // }

        // // 2. Update it
        // await db.query(
        //     `UPDATE announcements
        //      SET title = ?, date = ?, description = ?
        //      WHERE id = ?`,
        //     [title, date, description, id]
        // );

        // // 3. Get the updated record
        // const [rows] = await db.query(
        //     "SELECT * FROM announcements WHERE id = ?",
        //     [id]
        // );

        // // 4. Return updated record
        // res.json(rows[0]);
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
            `select * from announcements
             WHERE id = ?`,
            [ id]
        );

       

        if (existing.length === 0) {
            

            return res.status(404).json({
                message: "Announcement not found"
            });
        }
        await db.query(
            `update announcements
            set title=?,date=?,description=?
            where id=?`,[title,date,description,id]
        );
        

        const [rows] = await db.query(
            "SELECT * FROM announcements WHERE id = ?",
            [id]
        );

        

        res.json(rows[0]);
    }catch(error){
        next(error);
    }
})

app.delete("/api/announcements/:id", async (req, res,next) => {
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
});




/*========EVENTS API==========*/

app.get("/api/events", async (req, res,next) => {
    try {
        const [rows] = await db.query(
            "SELECT * FROM EVENTS"
        );
        res.json(rows);
    } catch (error) {
        next(error);
    }
});


app.post("/api/events", validateEvent,async (req, res,next) => {


    try {
        const { title, date, location } = req.body;
        
        const [result] = await db.query(
            `INSERT INTO EVENTS (TITLE,DATE,LOCATION)
            VALUES(?,?,?)`, [title, date, location]
        );

        const [rows] = await db.query(
            "SELECT * FROM EVENTS WHERE id=?", [result.insertId]
        );

        res.status(201).json(rows[0]);

    } catch (error) {
        next(error);
    }
});


app.delete("/api/events/:id", async (req, res,next) => {
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
            "DELETE FROM EVENTS WHERE id=?", [id]
        );


        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Event not found"
            });
        }



        res.json({
            message: "Event deleted successfully"
        });
    } catch (error) {
        next(error);
    }
});


app.put("/api/events/:id",validateEvent,async(req,res,next)=>{
    try {
        const eventId=Number(req.params.id);
        if(!isValid(eventId)){
            return res.status(400).json(
                {
                    message:"Invalid ID"
                }
            );
        }
        const {title,date,location}=req.body;
        
        const [existing]=await db.query(
            `SElect * from events where id=?`,
            [eventId]
        );

        if(existing.length===0){
            return res.status(404).json(
                {
                    message:"Event not found"
                }
            );
        }
        await db.query(
            `update events
            set title=?,date=?,location=?
            where id=?`,[title,date,location,eventId]
        );
        const [rows]=await db.query(
            `select * from events
            where id=?`,[eventId]
        );

        res.json(rows[0]);
    } catch (error) {
        next(error);
    }
})



app.get("/api/notes", async (req, res,next) => {
    try {
        const [rows] = await db.query(
            "SELECT * FROM NOTES"
        );
        res.json(rows);
    }
    catch (error) {
        next(error);
    }
});

app.post("/api/notes", validateNote,async (req, res,next) => {
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


});

app.delete("/api/notes/:id", async (req, res,next) => {
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
});
app.put("/api/notes/:id",validateNote,async(req,res,next)=>{
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
})

// a fun having 4 para is used for error handler : the way express works
function errorHandler(error,req,res,next){
    console.error(error);
    res.status(500).json({
        message:"Internal server error"
    });
}



app.use(errorHandler);
app.listen(PORT, () => {//(platform,callback)
    console.log(`CampusHub server running on port ${PORT}`);
});