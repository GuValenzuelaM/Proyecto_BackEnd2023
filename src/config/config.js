// Importar el paquete dotenv y cargar las variables de entorno desde el archivo .env
import dotenv from "dotenv"
dotenv.config();

// Configuración de la app
export const config = {
    filesystem:{
        //Almacenamiento de productos
        products: "products.json",
        //Almacenamiento de carritos
        carts:"carts.json"
    },
    server:{
        port: process.env.PORT || 8080,
        secretSession: process.env.SECRET_SESION,
        persistence: process.env.PERSISTENCE
    },
    mongo:{
        // URL BD MongoDB
        //"mongodb+srv://guvalenzuelam:Coder2023@coderhouse.zqpfl7k.mongodb.net/sessionsDB?retryWrites=true&w=majority"
        url:process.env.MONGO_URL
    }
}