import mongoose from "mongoose";



const subschema = new mongoose.Schema({
    subjectname:{type:String,required:true,trim:true}

})


const SubjectModel = mongoose.model("subject")

