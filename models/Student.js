import mongoose from "mongoose";


const studSchema = new mongoose.Schema({

    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    address:{type:String,required:true},


})

const StudModel = mongoose.model("studenttb",studSchema);




