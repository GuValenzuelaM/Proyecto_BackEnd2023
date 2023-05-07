//ENTREGA PROYECTO

import express from "express";
import {__dirname} from "./utils.js";
import path from "path";
import handlebars from "express-handlebars";
import { viewsRouter } from "./routes/views.routes.js";
import {productRouter} from "./routes/products.routes.js";
import {cartRouter} from "./routes/carts.routes.js";
import {Server} from "socket.io";

import {ProductManager} from "../managers/ProductManager.js";

//console.log("dirname: ", __dirname);
//console.log(path.join("dirname: ", __dirname,"/public"));

const app =express();
//const port = 8080;
const port = process.env.PORT || 8080;


//SERVIDOR HTTP
const httpServer = app.listen(port,()=>console.log(`Server listening on port${port}`));

//SERVIDOR DE WEBSOCKET
const socketServer = new Server(httpServer);

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

const productManager = new ProductManager("../files/products.json");
const products = productManager.getProduct();

//REAL TIME
//Escucha el metodo la conexión de una nueva persona 
socketServer.on("connection",(socket)=>{
    //detectamos al cliente conectado
    console.log(`nuevo cliente conectado ${socket.id}`);
    socket.emit("messageServer","Te has conectado correctamente")
    socket.emit("totalProducts",products)
    
    socket.on("message",(products)=>{
        //emite el mensaje a todos los conectados
        socketServer.emit("totalProducts",products)
        console.log("mensaje desde el cliente", products)
    });
});

/* 
//SOCKET DEL SERVIDOR
socketServer.on("connection",(socket)=>{
    //detectamos al cliente conectado
    console.log(`nuevo cliente conectado ${socket.id}`);
    socket.emit("messageServer","Te has conectado correctamente")
    
    socket.on("messageKey",(data)=>{
        console.log("mensaje desde el cliente", data)
    });
});
*/
