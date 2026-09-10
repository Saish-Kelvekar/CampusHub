const express=require("express");
const router=express.Router();
const {validateNote}=require("../middleware/validation");

const {getNotes,createNote,deleteNote,updateNote}=require("../controllers/notesController");
const authMiddleware=require("../middleware/authMiddleware")
router.get("/", authMiddleware,getNotes);

router.post("/", authMiddleware,validateNote,createNote);

router.delete("/:id", authMiddleware,deleteNote);

router.put("/:id",authMiddleware,validateNote,updateNote);

module.exports=router;
