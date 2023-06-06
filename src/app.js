import express from "express";
import {engine} from "express-handlebars";
import path from "path";
import {__dirname} from "./utils.js";
import { connectDB } from "./config/dbConnection.js";
import { viewsRouter } from "./routes/views.routes.js";
import {ProductManager} from "./managers/ProductManager.js";

import {Server} from "socket.io";
import {productsRouter} from "./routes/products.routes.js";
import {cartsRouter} from "./routes/carts.routes.js";

import session from "express-session";
import MongoStore from "connect-mongo";
import {ChatMongo} from "./daos/managers/chat.mongo.js";
import { options } from "./config/options.js";
import passport from "passport";
import { initializePassport } from "./config/passport.config.js";
import { authRouter } from "./routes/auth.routes.js";


const app = express();
const port = 8080;

const productManager = new ProductManager("products.json")

connectDB();

//MIDLEWARES:
//Para recibir la inforamción de la petición de tipo post
app.use(express.json());
app.set('views', path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({extended:true}));

//SERVIDOR HTTP
const httpServer = app.listen(port,()=>console.log(`Server listening on port ${port}`));

//SERVIDOR DE WEBSOCKET
const socketServer = new Server (httpServer);
app.listen(port,()=>console.log(`Server listening on port ${port}`));

//CONFIGURACUÓN HANDLEBARS
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname,"/views"));

//ROUTES PARA PRODUCTOS Y CARRITOS
app.use(viewsRouter); //ruta por defecto
app.use("/api/products",productsRouter);
app.use("/api/carts",cartsRouter);
app.use("/api/sessions", authRouter);

const chatService = new ChatMongo();

socketServer.on("connection", async(socket)=>{
    const messages = await chatService.getMessages();
    socketServer.emit("MessageHistory", messages);

    socket.on("message", async(data)=>{
        await chatService.addMessage(data);
        const messages = await chatService.getMessages();
        socketServer.emit("MessageHistory", messages);
    })
})

