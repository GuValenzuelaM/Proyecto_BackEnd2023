//ENTREGA PROYECTO

import express from "express";
import {__dirname} from "./utils.js";
import path from "path";
import handlebars from "express-handlebars";
import { viewsRouter } from "./routes/views.routes.js";
import {productRouter} from "./routes/products.routes.js";
import {cartRouter} from "./routes/carts.routes.js";
import {Server} from "socket.io";
import {ProductManager} from "./managers/ProductManager.js";

const app =express();
const port = process.env.PORT || 8080;

//SERVIDOR HTTP
const httpServer = app.listen(port,()=>console.log(`Server listening on port${port}`));

//SERVIDOR DE WEBSOCKET
const socketServer = new Server (httpServer);

//CONFIGURACUÓN HANDLEBARS
app.engine('.hbs', handlebars.engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname,"/views"));

//MIDLEWARES:
//Para recibir la inforamción de la petición de tipo post
app.use(express.json());
app.use(express.static(path.join(__dirname,"/public")));

//ROUTES PARA PRODUCTOS Y CARRITOS
app.use("/api/products",productRouter);
app.use("/api/carts",cartRouter);
app.use(viewsRouter); //ruta por defecto

const productManager = new ProductManager("../files/products.json");
const products = productManager.getProduct();

//REAL TIME
//Escucha el metodo la conexión de una nueva persona 
socketServer.on("connection", async(socket)=>{
    try {
        console.log(`Se ha conectado un nuevo cliente: ${socket.id}`)
    const totalProducts = await productManager.getProducts();
    socketServer.emit("totalProductsMessage", totalProducts);

    socket.on("newProduct", async(data)=>{
        try {
            console.log("newProduct", data);
            const addedProduct = await productManager.addProduct(data);
            
            socketServer.emit("newProductMessage", addedProduct);
        } catch (error) {
            throw new error (error.message);
        }
       
    });
    } catch (error) {
        throw new error (error.message);
    }

    socket.on("deleteProduct", async(data)=>{
        try {
            await productManager.deleteProducts(data);
        } catch (error) {
            throw new error (error.message); 
        }
        
    })
});
