//ENTREGA PROYECTO Nª1

import express from "express";
import {__dirname} from "./utils.js";
import path from "path";
import handlebars from "express-handlebars";
import { viewsRouter } from "./routes/views.routes.js";

import {productRouter} from "./routes/products.routes.js";
import {cartRouter} from "./routes/carts.routes.js";
//console.log("dirname: ", __dirname);
//console.log(path.join("dirname: ", __dirname,"/public"));

const app =express();
const port = 8080;

app.listen(port,()=>console.log(`Server listening on port${port}`));

//configuración del motor de plantillas
app.engine("handlebars",handlebars.engine()); //inicializando un motor de plantillas
app.set("views",path.join(__dirname,"/views")); //ruta de almacenamiento de las vistas
app.set("view engine","handlebars");

//MIDLEWARES:
//Para recibir la inforamción de la petición de tipo post
app.use(express.json());
//app.use(express.static("public"));
app.use(express.static(path.join(__dirname,"/public")));

//routes para productos y carritos
app.use("/api/products",productRouter);
app.use("/api/carts",cartRouter);
app.use("/",viewsRouter); //ruta por defecto
