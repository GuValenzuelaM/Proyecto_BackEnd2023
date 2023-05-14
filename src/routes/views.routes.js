import {Router} from "express";
import fs from "fs";
import path from "path";
import { __dirname } from "../utils.js";
import {ProductManager} from "../managers/ProductManager.js";
import { uploader } from "../utils.js";
import {productRouter} from "../routes/products.routes.js";
import {cartRouter} from "../routes/carts.routes.js";

const router =Router();
const productManager = new ProductManager("products.json");
const products = productManager.getProduct();


//GET PRODUCTS VERSIÓN 1(PROBLEMA - NO MUESTRA OBJETOS DEL ARREGLO)
router.get("/", async(req,res)=>{
    try {
        const products = await productManager.getProduct();
        const objectInfo = {
            products,
            style: "/home.css"
        };
        res.render("home",objectInfo);
    } catch (error) {
        res.status(400).json({status: "error", message: error.message});
    }
});

router.get("/realtimeproducts", async(req, res)=>{
    try {
        const products = await productManager.getProduct();

        res.render("realTimeProducts", {products: products});
    } catch (error) {
        res.status(400).json({status: "error", message: error.message});
    }   
});

export {router as viewsRouter};
