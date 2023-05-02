const {Router}=require("express");
//const bcrypt=require("bcrypt");
const {ArticalModel}=require("../model/articals.model");
const jwt=require("jsonwebtoken");

const articalRouter=Router();


articalRouter.post("/add",async(req,res)=>{
    try{
        const newarticle= new ArticalModel(req.body);
        await newarticle.save();

        res.status(200).json({"msg":"Article added"});
        

    }catch(err){
        res.sendStatus(400).json({"err":err.message})

    }
});

articalRouter.get("/",async(req,res)=>{
     const {userID}=req.body;
     const{title,category,page,limit}=req.query;
     
    try{
        if(title){
            const data= await ArticalModel.find({title:title});
            res.status(200).json({"data":data});

        }else if(category){
            const data= await ArticalModel.find({category:category});
            res.status(200).json({"data":data});

        }else if(page,limit){
            let skipcount=(page-1)*limit;
            const data=await ArticalModel.find().skip(skipcount).limit(limit);
            res.status(200).json({"data":data});

        }else{
            const data= await ArticalModel.find({userID});
            res.status(200).json({"data":data});
        }
        

    }catch(err){
        res.status(200).json({"err":err.message});
    }
});
articalRouter.get("/:id",async(req,res)=>{
    const id=req.params.id;
    try{
        const data= await ArticalModel.findOne({_id:id});
        res.status(200).json({"data":data});

    }catch(err){
        res.status(400).json({"err":err.message});
    }
});


articalRouter.patch("/edit/:id",async(req,res)=>{
    const id=req.params.id;
    try{
        await ArticalModel.findByIdAndUpdate({_id:id},req.body);
        res.status(200).json({"msg":"Artical Updated"})

    }catch(err){
        res.status(400).json({"err":err.message});
    }
});

articalRouter.delete("/rem/:id",async(req,res)=>{
    const id=req.params.id;
    try{
        await ArticalModel.findByIdAndDelete({_id:id});
        res.status(200).json({"msg":"Artical Deleted"})
    }catch(err){
        res.status(400).json({"err":err.message});
    }
});



module.exports={articalRouter};

