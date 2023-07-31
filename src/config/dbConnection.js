import mongoose from "mongoose";
import { config } from "./config.js"
//import { confi } from "dotenv";

// Función de conexión a base de datos MongoDB
export const connectDB = async()=>{
    try {
        // Intentar conectarse a la base de datos utilizando la URL proporcionada en la configuración        
        await mongoose.connect(config.mongo.url);
        console.log("Conexión exitosa con base de datos");
    } catch (error) {
        console.log(`No se logró conectar a la base de datos ${error.message}`);
    }
};
