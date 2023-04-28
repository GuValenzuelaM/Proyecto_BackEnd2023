//DESAFIO 3

import express from "express";
import { ProductManager } from "./ProductManager.js";


const app =express();
const port = 8080;

app.listen(port,()=>console.log(`Server listening on port${port}`));

app.get("/",(request,response)=>{
    response.send("Bienvenido al Desafio");
});

app.get("/products", async (req, res) => {
  try {
      const productmanager = new ProductManager("./products.json");
      const products = await productmanager.getProduct();
      const limit = parseInt(req.query.limit); // Accede al valor del query param limit y lo convierte a un número entero
      
      if (isNaN(limit)) { // Si el valor de limit no es un número, devuelve todos los productos
          res.json({status: "success", message: "Listado total de productos", data: products});
      } else if (limit <= 0) { // Si el valor de limit es menor o igual a cero, devuelve un error
          res.status(400).json({status: "error", message: "Sin productos en el arreglo products"});
      } else { // Si el valor de limit es un número válido, devuelve una cantidad limitada de productos
          const limitedProducts = products.slice(0, limit);
          res.json({status: "success", data: limitedProducts});
      }
  } catch (error) {
      res.status(400).json({ status: "error", message: error.message });
  };
});

app.get("/:pid", async(req,res)=>{
  const productId = req.params.pid;
  const productmanager = new ProductManager("./products.json");
  const products =await productmanager.getProduct();
  const product = products.find(item=>item.id ===parseInt(productId));
  if(product){
  res.json({status:"success", data:product});
  } else {
  res.status(400).json({status:"error", message:"No existe el producto"});
}
});