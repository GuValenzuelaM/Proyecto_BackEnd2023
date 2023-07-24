// Importa la configuración desde el archivo de configuración
import { config } from "../config/config.js";

// Declaración de variables para los DAOs
let cartsDao;
let productsDao;
let usersDao;
let chatDao;
let ticketsDao;

// Obtiene el tipo de persistencia desde la configuración
const PERSISTENCE = config.server.persistence;

// Switch para determinar el tipo de persistencia
switch (PERSISTENCE) {
    case "mongo":
        // Si es "mongo", se establece la conexión a la base de datos

        const { connectDB } = await import("../config/dbConnection.js");
        connectDB();
        
        const {CartsMongo} = await import("./managers/carts.mongo.js");
        cartsDao = new CartsMongo();
        
        const {ProductsMongo} = await import("./managers/products.mongo.js");
        productsDao = new ProductsMongo();
        
        const {userMongo} = await import("./managers/users.mongo.js");
        usersDao = new userMongo();

        const {ChatMongo} = await import("./managers/chat.mongo.js");
        chatDao = new ChatMongo();        
        
        const {Tickets} = await import("./managers/ticket.mongo.js");
        ticketsDao = new Tickets();

    break;

    case "memory":
        const {CartManager} = await import("./managers/memory/CartManager.js");
        const {ProductManager} = await import("./managers/memory/ProductManager.js");
        cartsDao = new CartManager();
        productsDao = new ProductManager();
    break;
}

// Exporta los DAOs correspondientes para su uso en otros módulos
export {cartsDao, productsDao, usersDao, chatDao, ticketsDao};
