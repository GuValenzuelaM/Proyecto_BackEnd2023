import express from "express";
import {engine} from "express-handlebars";
import path from "path";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import cors from "cors";
import swaggerUI from "swagger-ui-express";

import {__dirname} from "./utils.js";
import {initializePassport} from "./config/passport.config.js";
import {config} from "./config/config.js"
import {logger} from "./utils/logger.js";
import {swaggerSpecs} from "./config/swaggerConfig.js";


import {viewsRouter} from "./routes/views.routes.js";
import {sessionsRouter} from "./routes/sessions.routes.js";
import {productsRouter} from "./routes/products.routes.js";
import {cartsRouter} from "./routes/carts.routes.js";
import {authRouter} from "./routes/auth.routes.js";

import {connectDB} from "./config/dbConnection.js";
import {cartsModel} from "./daos/models/carts.model.js";
import {options} from "./config/options.js";

const app =express();
const port = config.server.port;

app.listen(port,()=>logger.info(`Server listening on port ${port}`));
connectDB();

//MIDLEWARES:
//Para recibir la inforamción de la petición de tipo post
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "/public")));
//app.use(cookieParser());

//CONFIGURACUÓN HANDLEBARS
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname,"/views"));

//CONFIGURACIÓN DE SESSION
app.use(session({
    store:MongoStore.create({
        mongoUrl:config.mongo.url
    }),
    secret:config.server.secretSession,
    resave:true,
    saveUninitialized:true,
    //ttl:360
}));

//CONFIGURACIÓN DE PASSPORT
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

//ROUTES PARA PRODUCTOS Y CARRITOS
app.use(viewsRouter);
app.use("/api/sessions", sessionsRouter);
app.use("/api/products",productsRouter);
app.use("/api/carts",cartsRouter);
app.use("/api/users",authRouter);
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpecs));