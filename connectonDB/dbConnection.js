import mongoose from "mongoose";

const DB_OPTIONS = {
    dbName:"myschooldb"
}

const ConnectionDB = async (DATABASE_URL)=>{
    try {
        await mongoose.connect(DATABASE_URL,DB_OPTIONS);
        console.log("Connection Established...");
    } catch (err) {
        console.log(`Connection Failed ${err.message}`);
    }
}

export default ConnectionDB;