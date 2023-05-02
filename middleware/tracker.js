const fs=require("fs");

const tracker=(req,res,next)=>{
    console.log(fs);
    fs.appendFileSync("logs.txt",`IP: ${req.ip} | Method: ${req.method} | URL: ${req.url} | time: ${Date()}\n`);
    next();
};

module.exports={tracker};