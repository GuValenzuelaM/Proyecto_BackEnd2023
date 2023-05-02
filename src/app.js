//ENTREGA PROYECTO Nª1

import express from "express";
import {__dirname} from "./utils.js";
import path from "path";
import handlebars from "express-handlebars";
import { viewsRouter } from "./routes/views.routes.js";
import {productRouter} from "./routes/products.routes.js";
import {cartRouter} from "./routes/carts.routes.js";
import {Server} from "socket.io";

//console.log("dirname: ", __dirname);
//console.log(path.join("dirname: ", __dirname,"/public"));

const app =express();
//const port = 8080;
const port = process.env.PORT || 8080;

const httpServer = app.listen(port,()=>console.log(`Server listening on port${port}`));

//SERVIDOR DE WEBSOCKET
const io = new Server(httpServer);


//MIDLEWARES:
//Para recibir la inforamción de la petición de tipo post
app.use(express.json());
//app.use(express.static("public"));
app.use(express.static(path.join(__dirname,"/public")));


//CONFIGURACUÓN HANDLEBARS
app.engine('.hbs', handlebars.engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname,"/views"));

//routes para productos y carritos
app.use("/api/products",productRouter);
app.use("/api/carts",cartRouter);
app.use(viewsRouter); //ruta por defecto

//SOCKET DEL SERVIDOR
io.on("connection",()=>{
    console.log(`nuevo cliente conectado ${socket.id}`);
})


