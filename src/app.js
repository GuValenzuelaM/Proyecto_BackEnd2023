//ENTREGA PROYECTO Nª1

import express from "express";
import {productRouter} from "./routes/products.routes.js";
import {cartRouter} from "./routes/carts.routes.js";

const app =express();
const port = 8080;

app.listen(port,()=>console.log(`Server listening on port${port}`));


//midlewares: Para recibir la inforamción de la petición de tipo post
app.use(express.json());

//routes para productos y carritos
app.use("/api/products",productRouter);
app.use("/api/carts",cartRouter);

