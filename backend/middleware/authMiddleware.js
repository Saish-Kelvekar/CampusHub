const jwt=require("jsonwebtoken");

const authMiddleware=(req,res,next)=>{
    try{
        const authHeader=req.headers.authorization;

        if(!authHeader){
            return res.status(401).json({
                message:"Access token required"
            });
        }

        const token=authHeader.split(" ")[1];

        if(!token){
            return res.status(401).json({
                message:"Invalid authorization format"
            });
        }

        const decoded=jwt.verify(
            token,
            process.env.JWT_SECRET
        );//checks whether the token was signed using the jwt secret
        //if yes then it provides the payload

        req.user=decoded;//we are adding the payload to the user
        next();

    }
    catch(error){
        return res.status(401).json({
            message:"Invalid or expired token"
        });
    }
};

module.exports=authMiddleware;