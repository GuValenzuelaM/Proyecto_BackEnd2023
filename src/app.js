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

const app =express();
const port = 8080;

//MIDLEWARES:
//Para recibir la inforamción de la petición de tipo post
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));
//app.use(express.urlencoded({extended:true}));

//SERVIDOR DE WEBSOCKET
//const socketServer = new Server (httpServer);
app.listen(port,()=>console.log(`Server listening on port ${port}`));

//SERVIDOR HTTP
//const httpServer = app.listen(port,()=>console.log(`Server listening on port ${port}`));

connectDB();

//CONFIGURACUÓN HANDLEBARS
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname,"/views"));

//ROUTES PARA PRODUCTOS Y CARRITOS
app.use(viewsRouter); //ruta por defecto
app.use("/api/products",productsRouter);
app.use("/api/carts",cartsRouter);

//PENDIENTE DE REVISIÓN

/*
const productManager = new ProductManager("products.json");
const products = productManager.getProduct();

//REAL TIME
socketServer.on("connection", async(socket)=>{
    try {
        console.log(`Se ha conectado un nuevo cliente: ${socket.id}`)
        const totalProducts = await productManager.getProduct();
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

    socket.on("eraseProduct", async(data)=>{
        try {
            await productManager.deleteProduct(data);
        } catch (error) {
            throw new error (error.message); 
        }
        
    })
});
*/
