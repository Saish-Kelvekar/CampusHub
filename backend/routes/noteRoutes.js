const express=require("express");
const router=express.Router();
const {validateNote}=require("../middleware/validation");

const {getNotes,createNote,deleteNote,updateNote}=require("../controllers/notesController");

router.get("/", getNotes);

router.post("/", validateNote,createNote);

router.delete("/:id", deleteNote);

router.put("/:id",validateNote,updateNote);

module.exports=router;
