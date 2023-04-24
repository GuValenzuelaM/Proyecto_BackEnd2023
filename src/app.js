//ENTREGA PROYECTO Nª1

import express from "express";
import {productRouter} from "./routes/products.routes.js";
import {cartRouter} from "./routes/carts.routes.js";

const app =express();
const port = 8080;

app.listen(port,()=>console.log(`Server listening on port${port}`));

/*
app.get("/",(request,response)=>{
    response.send("Bienvenido al Desafio 3");
});

app.get('/products', (req, res) => {
    const limit = req.query.limit;
    
    fs.readFile('products.json', (err, data) => {
      if (err) throw err;
  
      const products = JSON.parse(data);
  
      if (limit && !isNaN(limit)) {
        res.send(products.slice(0, limit));
      } else {
        res.send(products);
      }
    });
});
*/


//midlewares: Para recibir la inforamción de la petición de tipo post
app.use(express.json());

//routes para productos y carritos
app.use("/api/products",productRouter);
app.use("/api/carts",cartRouter);

