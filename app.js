import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import ConnectionDB from "./connectonDB/dbConnection.js";
import web from "./routes/web.js";
const app = express();
const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

ConnectionDB(DATABASE_URL);
app.use(cors());
app.use(express.json());
app.use("/api",web);









app.listen(PORT,()=>{
    console.log(`The Server Is Running On http://127.0.0.1:${PORT}`);
})