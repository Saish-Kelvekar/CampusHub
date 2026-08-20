function validateFieldsMiddleware(fields){
    return (req,res,next)=>{
        for(const field of fields){
            const value=req.body[field];
            if(!value?.trim()){
                return res.status(400).json({
                    message:`${field} is required`
                })
            }
        }
        next();
    }
}

function isValid(id) {
    return Number.isInteger(id) && id > 0;
}
const validateAnnouncement=validateFieldsMiddleware(["title","date","description"]);
const validateEvent=validateFieldsMiddleware(["title","date","location"]);
const validateNote=validateFieldsMiddleware(["title","subject","description"]);


module.exports={
    validateAnnouncement,
    validateEvent,
    validateNote,
    isValid
}