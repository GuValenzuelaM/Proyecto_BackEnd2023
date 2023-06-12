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
import { cartsModel } from "./daos/models/carts.model.js";

import session from "express-session";
import MongoStore from "connect-mongo";
import { options } from "./config/options.js";
import { authRouter } from "./routes/auth.routes.js";

import MongoStore from "connect-mongo";

//Almacena las sesiones en archivos
//import FileStore from "session-file-store";
//CONECTAR AL MODULO SESSION CON FILESTORE
//const fileStorage = FileStore(session);

const app =express();
const port = 8080;

connectDB();

//MIDLEWARES:
//Para recibir la inforamción de la petición de tipo post
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({extended:true}));

//SERVIDOR DE WEBSOCKET
//const socketServer = new Server (httpServer);
app.listen(port,()=>console.log(`Server listening on port ${port}`));

//SERVIDOR HTTP
//const httpServer = app.listen(port,()=>console.log(`Server listening on port ${port}`));

//CONFIGURACIÓN DE SESSION
app.use(session({
    store: MongoStore.create({
        mongoUrl:"mongodb+srv://guvalenzuelam:Coder2023@coderhouse.zqpfl7k.mongodb.net/sessionsDB?retryWrites=true&w=majority",
        ttl:20
    }),
    secret:"claveSecreta",
    resave:true,
    saveUninitialized:true
}));

//CONFIGURACUÓN HANDLEBARS
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname,"/views"));

//ROUTES PARA PRODUCTOS Y CARRITOS
app.use(viewsRouter); //ruta por defecto
app.use("/api/products",productsRouter);
app.use("/api/carts",cartsRouter);
app.use("/api/sessions", authRouter);