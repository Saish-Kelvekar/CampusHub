const db=require("../config/database");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");

const register=async(req,res)=>{
    try{
        const{name,email,password}=req.body;

        if(!name|| !email|| !password){
            return res.status(400).json({
                message:"Name,email and password are required"
            });
        }

        const [existingUser]=await db.query(
            "SELECT id FROM users where email=?",[email]
        );

        if(existingUser.length>0){
            return res.status(409).json({
                message:"Email already registered"
            });
        }

        const passwordHash=await bcrypt.hash(password,10);

        const [result]=await db.query(
            "INSERT INTO users(name,email,password_hash) VALUES(?,?,?)",[name,email,passwordHash]
        );

        res.status(201).json({
            message:"User registered successfully",
            userId:result.insertId
        });
    }catch(error){
        console.error("Registration error: ",error);

        res.status(500).json({
            message:"Server error"
        });
    }
}


const login=async(req,res)=>{
    try{
        const{email,password}=req.body;

        if(!email || !password){
            return res.status(400).json({
                message:"Email and password are required"
            });
        }

        const [users]=await db.query(
            "SELECT * FROM users WHERE email=?",[email]
        );

        if(users.length===0){
            return res.status(401).json({
                message:"Invalid email or password"
            });
        }

        const user=users[0];
        console.log("USER FROM DATABASE:", user);

        const passwordMatch= await bcrypt.compare(
            password,
            user.password_hash
        );

        if(!passwordMatch){
            return res.status(401).json({
                message:"Invalid email or password"
            });
        }
        const token=jwt.sign(
            {//payload
                id:user.id,
                email:user.email,
                role:user.role
            },
            process.env.JWT_SECRET,//secret
            {//options
                expiresIn:"1h"
            }
        )

        res.status(200).json({
            message:"Login successful",
            token:token,
            user:{
                id:user.id,
                name:user.name,
                email:user.email,
                role:user.role
            }
        });
    }catch(error){
        console.error("Login error: ",error);

        res.status(500).json({
            message:"Server error"
        });
    }
};

const getMe=(req,res)=>{
    res.status(200).json({
        user:req.user
    })
}
module.exports={
    register,
    login,
    getMe
};