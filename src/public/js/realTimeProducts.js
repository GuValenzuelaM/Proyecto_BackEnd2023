/*
import {ProductManager} from "../managers/ProductManager.js";
const productManager = new ProductManager("../files/products.json");
const products = productManager.getProduct();
*/


console.log("Archivo JS RealTimeProducts");
const socketClient = io();

//DATOS DE CADA PRODUCTO
const title = document.getElementById("title");
const description = document.getElementById("description");
const category = document.getElementById("category");
const price = document.getElementById("price");
const thumbnail = document.getElementById("thumbnail");
const code = document.getElementById("code");
//const status =document.getElementById("status");
const stock = document.getElementById("stock");

//OPERACIONES
const getProducts = document.getElementById("getProducts");
const addProduct = document.getElementById("addProduct");
const idProduct = document.getElementById("idProduct");
const deleteProduct = document.getElementById("deleteProduct");


addProduct.addEventListener("click", (e)=>{
    const newProduct = {
            title: title.value,
            description: description.value,
            category: category.value,
            price: price.value,
            thumbnail: thumbnail.value,
            code: code.value,
            //status:"true",
            stock: stock.value
    } 
    socketClient.emit("newProduct", newProduct)
}); 

deleteProduct.addEventListener("click", (e)=>{
    socketClient.emit("deleteProduct", idProduct.value);
});

socketClient.on("totalProductsMessage", (data)=>{
    console.log(data);
    
    getProducts.innerHTML = "";
    data.forEach(element => {
        const refresh = document.createElement("p");
        refresh.innerHTML = `${JSON.stringify(element)}`;
        getProducts.appendChild((refresh));
    });
})