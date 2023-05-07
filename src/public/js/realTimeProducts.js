/*
import {ProductManager} from "../managers/ProductManager.js";
const productManager = new ProductManager("../files/products.json");
const products = productManager.getProduct();
*/


console.log("soy el archivo javascript para la página home");
const socketClient = io();

socketClient.on("messageServer",(data)=>{
    console.log(data);
}); 

socketClient.on("totalProducts",(data)=>{
    console.log(data);
}); 