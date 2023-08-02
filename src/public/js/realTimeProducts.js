import {logger} from "../../utils/logger.js";

logger.debug("Archivo JS RealTimeProducts");
const socketClient = io();

//DATOS DE CADA PRODUCTO
const title = document.getElementById("title");
const description = document.getElementById("description");
const category = document.getElementById("category");
const price = document.getElementById("price");
const code = document.getElementById("code");
const stock = document.getElementById("stock");
const thumbnail = document.getElementById("thumbnail");
//const status =document.getElementById("status");

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
    socketClient.emit("eraseProduct", idProduct.value);
});

socketClient.on("totalProductsMessage", (data)=>{
    logger.info(data);
    
    getProducts.innerHTML = "";
    data.forEach(element => {
        const refresh = document.createElement("p");
        refresh.innerHTML = `${JSON.stringify(element)}`;
        getProducts.appendChild((refresh));
    });
})
