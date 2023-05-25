import StudModel from "../models/Student.js";
import bcrypt from 'bcrypt';
import Jwt from "jsonwebtoken";

class Student{

    static CreateDoc  = async (req,res)=>{
        try {
            const {name,email,password,address} = req.body;
            const extUsr = await StudModel.findOne({email:email});
            if(!extUsr){
                if(name && email && password && address){
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password,salt);
            const doc = StudModel({
                name:name,
                email:email,
                password:hashPassword,
                address:address
            })
            await doc.save();
            const saved_usr = await StudModel.findOne({email:email});
            const token = Jwt.sign({ userID: saved_usr._id }, process.env.SECRET_KEY, { expiresIn: "1day" });
            res.status(201).json({success: true, message:"Data Save Successfully",token:token,error: null});
        }else{
            res.status(400).json({success: false, message:"All Fields Are Required"});
        }
        }else{
            res.status(400).json({success: false, message:"User Already Exist"});
        }
        } catch (error) {
            res.status(400).json({success: false, message:"Data Not Saved",error:error.message});
        }
    }

    static getData = async (req,res)=>{
        try {
            const studData = await StudModel.find();
            if(studData.length > 0){
            res.status(200).json({success: true, data: studData, error: null});
        }else{
            res.status(200).json({success: false, message: "No Data Found", error: null});
        }
        } catch (error) {
            res.status(404).json({success: false, data: null, error: error.message});
        }
    }

    static updateData = async (req,res)=>{
        try {
            await StudModel.findByIdAndUpdate(req.params.id,req.body);
            res.status(200).json({success: true, message:"Data Updated Successfully", error: null});
        } catch (error) {
            res.status(200).json({success: false, message:"Data Not Updated", error: error.message});
        }
    }

    static deleteData = async (req,res)=>{
        try {
            const delData =  await StudModel.findByIdAndDelete(req.params.id);
            if(delData){
                res.status(200).json({success: true, message:"Data Deleted", error: null});
            }
            else{
                res.status(200).json({success: true, message:"Data Doesn't Exist Or Already Deleted", error: null});
            }
        } catch (error) {
            res.status(400).json({success: false, message:"Data Not Deleted", error:error.message});
        }
    }
        
    static userProfile = (req,res)=>{
       try {
        const userProfileData = {
            name:"Dawood Badshah",
            email:"dawoodbadshah@gmail.com",
            phoneno:"03451111111",
            address:"Malakand Skhakot Tehsil Dargai"
        }
        res.status(200).json({success: true, data: userProfileData, error: null});
       } catch (error) {
        res.status(400).json({success: false, data: null, error: error.message});
       }
    }
}

export default Student;