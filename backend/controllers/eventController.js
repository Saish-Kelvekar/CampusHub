const db = require("../config/database");
const { isValid } = require("../middleware/validation");

async function getEvents(req, res, next) {
    try {
        const [rows] = await db.query(
            "SELECT * FROM events WHERE user_id=?",[req.user.id]
        );

        res.json(rows);
    } catch (error) {
        next(error);
    }
}



async function createEvent(req, res, next) {


    try {
        const { title, date, location } = req.body;

        const [result] = await db.query(
            `INSERT INTO events (TITLE,DATE,LOCATION,user_id)
            VALUES(?,?,?,?)`, [title, date, location,req.user.id]
        );

        const [rows] = await db.query(
            "SELECT * FROM events WHERE id=? AND user_id=?", [result.insertId,req.user.id]
        );

        res.status(201).json(rows[0]);

    } catch (error) {
        next(error);
    }
};

async function deleteEvent(req, res, next) {
    try {
        const id = Number(req.params.id);
        if (!isValid(id)) {
            return res.status(400).json(
                {
                    message: "Invalid ID"
                }
            );
        }
        const [result] = await db.query(
            "DELETE FROM events WHERE id=? and user_id=?", [id,req.user.id]
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
};


async function updateEvent(req, res, next) {
    try {
        const eventId = Number(req.params.id);
        if (!isValid(eventId)) {
            return res.status(400).json(
                {
                    message: "Invalid ID"
                }
            );
        }
        const { title, date, location } = req.body;

        const [existing] = await db.query(
            `SELECT * FROM events WHERE id=? and user_id=?`,
            [eventId,req.user.id]
        );

        if (existing.length === 0) {
            return res.status(404).json(
                {
                    message: "Event not found"
                }
            );
        }
        await db.query(
            `UPDATE events
            SET title=?,date=?,location=?
            WHERE id=? and user_id=?`, [title, date, location, eventId,req.user.id]
        );
        const [rows] = await db.query(
            `SELECT * FROM events
            WHERE id=? and user_id=?`, [eventId,req.user.id]
        );

        res.json(rows[0]);
    } catch (error) {
        next(error);
    }
}


module.exports = {
    getEvents,
    createEvent,
    deleteEvent,
    updateEvent
}