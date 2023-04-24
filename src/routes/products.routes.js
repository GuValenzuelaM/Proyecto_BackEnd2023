//Importamos la clase router de la libreria express
import {Router} from "express";
import {ProductManager} from "../managers/ProductManager.js";

const productManager = new ProductManager("products.json");
console.log(productManager);
const router = Router();

//para llamar metodos asincronos tengo que usar funciones asincronas
router.get("/", async(req,res)=>{
    try {
        const products =await productManager.getProduct();
        res.json({status:"success", data:products});   
    } catch (error) {
        res.status(400).json({status:"error",message:error.message});
    }
});


router.post("/", async(req,res)=>{
        try {
            const {title, description, code, price, stock, category} =req.body;
            if(!title || !description || !code || !price || !stock || !category)
                return res.status(400).json({status:"error", message:"No se completaron todos los campos, por favor intentar nuevamente"});
            //const productFormat = await manager.formatProduct(newProduct);
            const newProduct =req.body;
            const productSaved = await productManager.addProduct(newProduct);
            res.json({status:"success", data:productSaved});
        } catch (error) {
            res.status(400).json({status:"error",message:"Por favor completar todos los campos con el formato adecuado"});
        }
    }
);

export{router as productRouter};