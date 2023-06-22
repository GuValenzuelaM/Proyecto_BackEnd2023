import express from "express";
import path from "path";
import {engine} from "express-handlebars";

import {__dirname} from "./utils.js";
import {productsRouter} from "./routes/products.routes.js";
import {cartsRouter} from "./routes/carts.routes.js";
import { viewsRouter } from "./routes/views.routes.js";
import { connectDB } from "./config/dbConnection.js";
import { cartsModel } from "./daos/models/carts.model.js";

import session from "express-session";
import MongoStore from "connect-mongo";
import { options } from "./config/options.js";
import { authRouter } from "./routes/auth.routes.js";

const app =express();
const port = 8080;

connectDB();

//MIDLEWARES:
//Para recibir la inforamción de la petición de tipo post
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "/public")));

app.listen(port,()=>console.log(`Server listening on port ${port}`));

//CONFIGURACIÓN DE SESSION
app.use(session({
    store: MongoStore.create({
        mongoUrl:"mongodb+srv://guvalenzuelam:Coder2023@coderhouse.zqpfl7k.mongodb.net/sessionsDB?retryWrites=true&w=majority",
        ttl:20 //20 segundos
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