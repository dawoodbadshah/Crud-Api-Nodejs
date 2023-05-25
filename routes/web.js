import Student from "../controllers/student.js";
import express from "express";
import userAuth from "../middlewares/authmiddleware.js";
const router = express.Router();

// Auth Middleware
router.use("/userprofile",userAuth);


// public routes
router.post("/createstudent",Student.CreateDoc);
router.get("/getstudent",Student.getData);
router.delete("/deletestudent/:id",Student.deleteData);
router.put("/updatestudent/:id",Student.updateData);

// Protected Routes
router.get("/userprofile",Student.userProfile);

export default router;