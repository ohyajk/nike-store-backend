import mongoose from "mongoose";
import dotenv from "dotenv";


// env
dotenv.config()
const DB_URL = process.env.DB_URL

// Connect MongoDB 
const connectDB = async () => {
    try {
        await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('🟢🟢 DB Connected Sire... 🟢🟢');
    } catch (error) {
        console.error('🚨🚨 ⛔ OH NO! DB Error ⛔ 🚨🚨:', error);
    }
};

export default connectDB;