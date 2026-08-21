const db = require("../config/database");
const { isValid } = require("../middleware/validation");

async function getEvents(req, res, next) {
    try {
        const [rows] = await db.query(
            "SELECT * FROM events"
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
            `SELECT * FROM events WHERE id=?`,
            [eventId]
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
            WHERE id=?`, [title, date, location, eventId]
        );
        const [rows] = await db.query(
            `SELECT * FROM events
            WHERE id=?`, [eventId]
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