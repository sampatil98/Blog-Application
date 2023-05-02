const express=require("express");

const connection=require("./config/db");
const {userRouter}=require("./routes/user.route");
const {articalRouter}=require("./routes/artical.route");
const {auth}=require("./middleware/auth");
const {tracker}=require("./middleware/tracker")


const app=express();
app.use(express.json());
app.use(tracker);

app.use("/user",userRouter);

app.use(auth);
app.use("/articles",articalRouter);

app.listen(8080,async()=>{
    try{
        await connection;
        console.log("connected to DB");
        console.log("Server is running at port 8080");
    }catch(err){
        console.log(err);
    }
})