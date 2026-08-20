const express=require("express");
const router=express.Router();

const {validateEvent}=require("../middleware/validation");

//<=====controller input====>
const {getEvents,createEvent,deleteEvent,updateEvent}=require("../controllers/eventController");


//<===to display ===>
router.get("/", getEvents);//getEvents is a controller function


//<====to add events===>
router.post("/", validateEvent,createEvent);

//<====to delete events====>
router.delete("/:id",deleteEvent );

//<===== to update events==>

router.put("/:id",validateEvent,updateEvent);

module.exports=router;

