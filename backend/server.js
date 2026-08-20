const express = require("express");

const cors = require("cors")
const app = express();
app.use(cors());
app.use(express.json());//used for post reason  JSON---(parse)-->req.body
const PORT = 3000;

const db = require("./config/database");





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


//<====ANNOUNCEMENTS API======>
const announcementRoutes=require("./routes/announcementRoutes");
app.use("/api/announcements",announcementRoutes);


/*========EVENTS API==========*/

const eventRoutes=require("./routes/eventRoutes");
app.use("/api/events",eventRoutes);






/*<======NOTES API======>*/

const noteRoutes=require("./routes/noteRoutes");
app.use("/api/notes",noteRoutes);







// a fun having 4 para is used for error handler : the way express works

const errorHandler=require("./middleware/errorHandler");
app.use(errorHandler);
app.listen(PORT, () => {//(platform,callback)
    console.log(`CampusHub server running on port ${PORT}`);
});