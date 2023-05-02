const mongoose=require("mongoose");

const articalSchema= mongoose.Schema({
    "title": {type:String,require:true},
    "body":  {type:String,require:true},
    "category":  {type:String,require:true},
    "live":  {type:Boolean,require:true},
    "user": {type:String,require:true},
    "userID": {type:String,require:true}

});


const ArticalModel= mongoose.model("Articaldata",articalSchema);

module.exports={ArticalModel};