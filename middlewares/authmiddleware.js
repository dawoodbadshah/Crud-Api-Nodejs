import Jwt from "jsonwebtoken";
import StudModel from "../models/Student.js";

const userAuth = async (req,res,next) => {

    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
    try {
        token = req.headers.authorization.split(' ')[1];
        const {userID} = Jwt.verify(token,process.env.SECRET_KEY);
        req.user = await StudModel.findById(userID).select('-password');
        next();
    } catch (err) {
        res.status(400).json({success:false,message:err.message});
    }
}else{
        res.status(401).json({success:false,message:"You Have No Token To Access This Page"});
    }
}

export default userAuth;