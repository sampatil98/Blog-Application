const jwt=require("jsonwebtoken");

const auth=(req,res,next)=>{

    const token=req.headers.authorization;

    if(token){
        try{
            const decode=jwt.verify(token.split(" ")[1],"sambhaji");
            req.body.user=decode.user;
            req.body.userID=decode.userID;
            
            next();
        }catch(err){
            res.status(200).json({"err":err.message});
        }
    }else{
        res.status(400).json({"msg":"please login"});
    }

};

module.exports={auth};