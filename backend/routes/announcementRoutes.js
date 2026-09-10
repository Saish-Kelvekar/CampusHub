const express=require("express");
const router=express.Router();

const {validateAnnouncement}=require("../middleware/validation")

//<=== Announcement controller===>

const {getAnnouncements,createAnnouncement,deleteAnnouncement,updateAnnouncement}=require("../controllers/announcementController");
const authMiddleware=require("../middleware/authMiddleware")

router.get("/", authMiddleware,getAnnouncements);


router.post("/",authMiddleware,
        validateAnnouncement,
        createAnnouncement);


router.put("/:id",authMiddleware,
    validateAnnouncement,
    updateAnnouncement);


router.delete("/:id",authMiddleware, deleteAnnouncement);


module.exports=router;
