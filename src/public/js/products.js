console.log("javascript products");
//import {logger} from "../../utils/logger.js"

//Prueba de sincronización
//logger.debug("javascript products");

const addToCart = async(productId)=>{
	console.log("Este sera el producto a agregar", productId);
	//logger.info("Este sera el producto a agregar", productId);
    fetch("http://localhost:8080/",{
		
    //FALTA LOGICA PARA AGREGAR PRODUCTO AL CARRITO

    })
};