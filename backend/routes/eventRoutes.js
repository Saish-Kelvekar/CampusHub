const express=require("express");
const router=express.Router();

const {validateEvent}=require("../middleware/validation");
const authMiddleware=require("../middleware/authMiddleware")
//<=====controller input====>
const {getEvents,createEvent,deleteEvent,updateEvent}=require("../controllers/eventController");


//<===to display ===>
router.get("/", authMiddleware,getEvents);//getEvents is a controller function


//<====to add events===>
router.post("/", authMiddleware,validateEvent,createEvent);

//<====to delete events====>
router.delete("/:id",authMiddleware,deleteEvent );

//<===== to update events==>

router.put("/:id",authMiddleware,validateEvent,updateEvent);

module.exports=router;

