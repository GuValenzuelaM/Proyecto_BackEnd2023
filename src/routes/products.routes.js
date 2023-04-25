//Importamos la clase router de la libreria express
import {Router} from "express";
import {ProductManager} from "../managers/ProductManager.js";

const productManager = new ProductManager("products.json");
console.log(productManager);
const router = Router();

//GET PRODUCTS CON LIMITES
router.get("/", async(req,res)=>{
    try {
        const products = await productManager.getProduct();
        const limit = parseInt(req.query.limit); // Accede al valor del query param limit y lo convierte a un número entero
        if (isNaN(limit)) { // Si el valor de limit no es un número, devuelve todos los productos
            res.json({status: "success", data: products});
        } else if (limit <= 0) { // Si el valor de limit es menor o igual a cero, devuelve un error
            res.status(400).json({status: "error", message: "Error de tipo 1"});
        } else { // Si el valor de limit es un número válido, devuelve una cantidad limitada de productos
            const limitedProducts = products.slice(0, limit);
            res.json({status: "success", data: limitedProducts});
        }
    } catch (error) {
        res.status(400).json({status: "error", message: error.message});
    }
});

// GET CON ID
router.get("/:pid", async(req,res)=>{
    const productId = req.params.pid;
    const products =await productManager.getProduct();
    const product = products.find(item=>item.id ===parseInt(productId));
    if(product){
    res.json({status:"success", data:product});
    } else {
    res.status(400).json({status:"error", message:"No existe el producto"});
}
});

//CARGAR NUEVOS PRODUCTOS
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

//DELETE
//http://localhost:8080/api/products/2 (pendiente actualización del arreglo products.json)

router.delete("/:pid", async(req,res)=>{
    const productId = req.params.pid;
    const products =await productManager.getProduct();
    //const filteredProducts =await productManager.deleteProduct(productId);
    const filteredProducts = products.filter(item => item.id !== parseInt(productId));
    if(filteredProducts.length !== products.length){
        res.json({status:"success", message:"El nuevo arreglo de prodcucto es el siguiente ",data:filteredProducts});
        const products = filteredProducts;
    } else {
        res.status(400).json({status:"error", message:"No existe el producto"});
    }
});

//UPDATE
//http://localhost:8080/api/products/1 (sin pruebas)
router.put("/:pid", async(req,res)=>{
    try {
        const productId = req.params.pid;
        const product =await productManager.getProductById(productId);
        const {title, description, code, price, stock, category} =req.body;
        if(!title || !description || !code || !price || !stock || !category)
            return res.status(400).json({status:"error", message:"No se completaron todos los campos, por favor intentar nuevamente"});
        const updatedProduct =req.body;
        const productSaved = await productManager.updateProduct(productId, updatedProduct);
        res.json({status:"success", data:productSaved});
    } catch (error) {
        res.status(400).json({status:"error",message:"Por favor completar todos los campos con el formato adecuado"});
    }
});

export{router as productRouter};