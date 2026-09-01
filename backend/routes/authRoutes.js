const express=require("express");
const {register,login,getMe}=require("../controllers/authController");
const authMiddleware=require("../middleware/authMiddleware");
const router=express.Router();

router.post("/register",register);//used for the registration
router.post("/login",login);//used for the login
router.get("/me",authMiddleware,getMe);


module.exports=router;