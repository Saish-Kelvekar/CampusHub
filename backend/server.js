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


// const announcements=[
//     {
//         id: 1,
//         title: "End Semester Examination",
//         date: "August 20",
//         description: "End semester examination timetable has been released."
//     },
//     {
//         id: 2,
//         title: "Hackathon Registration",
//         date: "August 25",
//         description: "Registrations are open for the upcoming campus hackathon."
//     }
// ];

app.get("/api/announcements", async (req, res) => {
    try {
        const [rows] = await db.query(
            "SELECT * FROM ANNOUNCEMENTS"
        );

        res.json(rows);
    } catch (error) {
        console.error("Error fetching announcements: ", error);

        res.status(500).json({
            message: "Failed to fetch announcements"
        });
    }
});

app.post("/api/announcements", async (req, res) => {
    // const newAnnouncement={
    //     id:announcements.length+1,
    //     title:req.body.title,
    //     date:req.body.date,
    //     description:req.body.description
    // };

    // announcements.push(newAnnouncement);
    // res.status(201).json(newAnnouncement);

    try {
        const { title, date, description } = req.body;
        if(!title?.trim()||!date?.trim()||!description?.trim()){
            return res.status(400).json(
                {
                    message:"All fields are required"
                }
            );
        }
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
        console.error("Error adding announcements ", error);
        res.status(500).json({
            message: "Failed to add annoucement"
        });
    }
});


app.put("/api/announcements/:id",async(req,res)=>{
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

        if(!Number.isInteger(id) || id<=0){
            return res.status(400).json(
                {
                    message:"Invalid ID"
                }
            );
        }
        const { title, date, description } = req.body;
        if(!title?.trim() || !date?.trim() || !description?.trim()){
            return res.status(400).json({
                message:"All fields are required"
            });
        }
        console.log("ID:", id);
        console.log("BODY:", req.body);

        const [existing] = await db.query(
            `select * from announcements
             WHERE id = ?`,
            [ id]
        );

        // console.log("UPDATE RESULT:", result);

        if (existing.affectedRows === 0) {
            console.log("NO ROW UPDATED");

            return res.status(404).json({
                message: "Announcement not found"
            });
        }
        await db.query(
            `update announcements
            set title=?,date=?,description=?
            where id=?`,[title,date,description,id]
        );
        console.log("UPDATE SUCCESSFUL");

        const [rows] = await db.query(
            "SELECT * FROM announcements WHERE id = ?",
            [id]
        );

        console.log("UPDATED ROW:", rows[0]);

        res.json(rows[0]);
    }catch(error){
        console.error("Error updating announcements: ",error);
        res.status(500).json({
            message:"Failed to update announcement"
        });
    }
})

app.delete("/api/announcements/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        if(!Number.isInteger(id) || id<=0){
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
        console.error("Error deleting announcements:", error);
        res.status(500).json({
            message: "Failed to delete announcement"
        });
    }
});




/*========EVENTS API==========*/

// const events=[
//     {
//         id:1,
//         title:"Campus Hackathon",
//         date : "August 18",
//         location:"Main Auditorium"
//     },
//     {
//         id: 2,
//         title: "Technical Workshop",
//         date: "August 22",
//         location: "Computer Lab 2"
//     },
//     {
//         id: 3,
//         title: "Sports Meet",
//         date: "August 27",
//         location: "College Ground"
//     }
// ];

app.get("/api/events", async (req, res) => {
    try {
        const [rows] = await db.query(
            "SELECT * FROM EVENTS"
        );
        res.json(rows);
    } catch (error) {
        console.error("Error fetching events: ", error);
        res.status(500).json({
            message: "Failed to fetch events"
        });
    }
});


app.post("/api/events", async (req, res) => {
    // const newEvent={
    //     id: events.length + 1,
    //     title: req.body.title,
    //     date: req.body.date,
    //     location: req.body.location
    // };
    // events.push(newEvent);
    // res.status(201).json(newEvent);

    try {
        const { title, date, location } = req.body;
        if(!title?.trim() || !date?.trim() || !location?.trim()){
            return res.status(400).json({
                message:"All fields are required"
            });
        }
        const [result] = await db.query(
            `INSERT INTO EVENTS (TITLE,DATE,LOCATION)
            VALUES(?,?,?)`, [title, date, location]
        );

        const [rows] = await db.query(
            "SELECT * FROM EVENTS WHERE id=?", [result.insertId]
        );

        res.status(201).json(rows[0]);

    } catch (error) {
        console.error("Error adding event:", error);

        res.status(500).json({
            message: "Failed to add event"
        });
    }
});


app.delete("/api/events/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        if(!Number.isInteger(id) || id<=0){
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
        console.error("Error deleting event :", error);
        res.status(500).json({
            message: "Failed to delete event"
        });
    }
});


app.put("/api/events/:id",async(req,res)=>{
    try {
        const eventId=Number(req.params.id);
        if(!Number.isInteger(eventId) || eventId<=0){
            return res.status(400).json(
                {
                    message:"Invalid ID"
                }
            );
        }
        const {title,date,location}=req.body;
        if(!title?.trim() || !date?.trim() || !location?.trim()){
            return res.status(400).json({
                message:"All fields are required"
            });
        }
        const [existing]=await db.query(
            `SElect * from events where id=?`,
            [eventId]
        );

        if(existing.affectedRows===0){
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
        console.error("Error while fetching event");
        res.status(500).json({
            message:"Event loading error"
        });
    }
})


// const notes = [
//     {
//         id: 1,
//         title: "Data Structures",
//         subject: "Computer Science",
//         description: "Linked lists, stacks, queues and trees."
//     },
//     {
//         id: 2,
//         title: "Operating Systems",
//         subject: "Computer Science",
//         description: "CPU scheduling and process management."
//     },
//     {
//         id: 3,
//         title: "Machine Learning",
//         subject: "Artificial Intelligence",
//         description: "Regression, classification and model evaluation."
//     }
// ];

app.get("/api/notes", async (req, res) => {
    try {
        const [result] = await db.query(
            "SELECT * FROM NOTES"
        );
        res.json(result);
    }
    catch (error) {
        console.error("Error in fetching notes: ", error);

        res.status(500).json({
            message: "Failed fetching notes"
        })
    }
});

app.post("/api/notes", async (req, res) => {
    try {
        const { title, subject, description } = req.body;
        if(!title?.trim() || !subject?.trim() || !description?.trim()){
            return res.status(400).json({
                message:"All fields are required"
            });
        }
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
        console.error("Error adding note:", error);

        res.status(500).json({
            message: "Failed to add note"
        });
    }


});

app.delete("/api/notes/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        if(!Number.isInteger(id) || id<=0){
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
        console.error("Error deleting note :", error);

        res.status(500).json({
            message: "Failed to delete note"
        });
    }
});
app.put("/api/notes/:id",async(req,res)=>{
    try {
        const notesId=Number(req.params.id);
        if(!Number.isInteger(notesId) || notesId<=0){
            return res.status(400).json(
                {
                    message:"Invalid ID"
                }
            );
        }
        const {title,subject,description}=req.body;
        if(!title?.trim() || !subject?.trim() || !description?.trim()){
            return res.status(400).json({
                message:"All fields are required"
            });
        }
        const [existing]=await db.query(
            `SELECT * fROM notes where id=?`,[notesId]
        );

        if(existing.affectedRows===0){
            return res.status(404).json(
                {
                    message:"Note not found"
                }
            );
        }

        await db.query(
            `Update notes
            set title=?, subject=?,description=?`,
            [title,subject,description]
        );

        const [rows]=await db.query(
            "Select * from notes  where id=?",[notesId]
        );

        res.json(rows[0]);
    } catch (error) {
        console.error("Error updating note:",error);
        res.status(500).json({
            message:"failed to update note"
        });
    }
})
app.listen(PORT, () => {//(platform,callback)
    console.log(`CampusHub server running on port ${PORT}`);
});