const {Router}=require("express");
const bcrypt=require("bcrypt");
const {UserModel}=require("../model/user.model");
const jwt=require("jsonwebtoken");

const userRouter=Router();


userRouter.post("/register", async (req,res)=>{
    const {password,email}=req.body;
    try{
        const user= await UserModel.findOne({email:email});
        if(user){
            res.status(200).json({"msg":"user already exists!!"});
        }else{

            bcrypt.hash(password,10,async(err,hash)=>{
                if(hash){
                let pass=hash;
                    const newuser= new UserModel({...req.body,password:pass});
                    console.log(newuser);
                    await newuser.save();
                    res.status(200).json({"msg":"User Registered"});
                }else{
                    res.status(200).json({"msg":err})
                }
            });

        }
    }catch(err){
        res.status(200).json({"msg":err});
    }
});

userRouter.post("/login", async (req,res)=>{
    const {email,password}=req.body;
    try{

        let user= await UserModel.findOne({email:email});

        if(user){
            bcrypt.compare(password,user.password,(err,result)=>{
                if(result){
                    const token = jwt.sign({ userID:user["_id"], user:user.name }, 'sambhaji');
                    res.status(200).json({"msg":"User Logedin","token":token});

                }else{
                    res.status(200).json({"msg":"Wrong password"});
                }
            })

        }else{
            res.status(400).send({"msg":"wrong Credintials"});
        }


    }catch(err){
        
    }
});





module.exports={userRouter}