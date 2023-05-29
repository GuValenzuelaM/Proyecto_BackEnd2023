import mongoose from "mongoose";
import { options } from "./options.js";

export const connectDB = async()=>{
    try {
        await mongoose.connect(options.mongo.url);
        console.log("Conexión exitosa con base de datos");
    } catch (error) {
        console.log(`No se logró conectar a la base de datos ${error.message}`);
    }
}; 