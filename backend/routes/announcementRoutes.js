const express=require("express");
const router=express.Router();
const db = require("../config/database");
const {validateAnnouncement}=require("../middleware/validation")

//<=== Announcement controller===>

const {getAnnouncements,createAnnouncement,deleteAnnouncement,updateAnnouncement}=require("../controllers/announcementController");


router.get("/", getAnnouncements);


router.post("/",
        validateAnnouncement,
        createAnnouncement);


router.put("/:id",
    validateAnnouncement,
    updateAnnouncement);


router.delete("/:id", deleteAnnouncement);


module.exports=router;
