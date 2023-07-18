import dotenv from "dotenv"
dotenv.config();


export const config = {
    filesystem:{
        products: "products.json",
        carts:"carts.json"
    },
    server:{
        port: process.env.PORT || 8080,
        secretSession: process.env.SECRET_SESION,
        persistence: process.env.PERSISTENCE

        
        //secretSession:"claveSecretaSesion"
    },
    mongo:{
        url:process.env.MONGO_URL
        //"mongodb+srv://guvalenzuelam:Coder2023@coderhouse.zqpfl7k.mongodb.net/sessionsDB?retryWrites=true&w=majority"
    }
}