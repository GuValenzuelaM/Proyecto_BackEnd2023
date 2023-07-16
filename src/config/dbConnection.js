import mongoose from "mongoose";
import { config } from "./config.js"

export const connectDB = async()=>{
    try {
        await mongoose.connect(config.mongo.url);
        console.log("Conexión exitosa con base de datos");
    } catch (error) {
        console.log(`No se logró conectar a la base de datos ${error.message}`);
    }
}; 