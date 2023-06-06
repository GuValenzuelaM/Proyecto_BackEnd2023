//Importamos la clase router de la libreria express
import {Router} from "express";
import { CartsMongo } from "../daos/managers/carts.mongo.js";
import { ProductsMongo } from "../daos/managers/products.mongo.js";
import { CartFiles } from "../daos/managers/carts.files.js";

//const cartsService = new CartFiles();
const cartsService = new CartsMongo();

const cartManager = new CartsMongo();
const productManager = new ProductsMongo();

const router = Router();

router.post("/", async(req,res)=>{
        try {
            const cartCreated = await cartManager.addCart();
            res.json({status:"success", data:cartCreated});
        } catch (error) {
            res.status(400).json({status:"error",message:error.message});
        }
});

//MOSTRAR EL CARRO
router.get("/:cid", async(req,res)=>{
    try {
        const cartId = req.params.cid;
        const cart = await cartsService.getCartById(cartId);
        if(cart){
            res.json({status:"success", data:cart});    
        } else{
            res.status(400).json({status:"error",message:"El carro no existe"});
        }
    } catch (error) {
        res.status(400).json({status:"error",message:error.message});
    }
});

//AGREGAR UN PRODUCTO AL CARRO
router.post("/:cid/product/:pid", async(req,res)=>{
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const cart = await cartManager.getCartById(cartId);
        if(cart){
            const product = await productManager.getProductById(productId);
            if(product){
                const response  = await cartManager.addProductToCart(cartId,productId);
                res.json({status:"success", message:response});
            } else {
                res.status(400).json({status:"error", message:"No es posible agregar este producto"});
            }
        } else {
            res.status(400).json({status:"error", message:"el carrito no existe"});
        }
    } catch (error) {
        res.status(400).json({status:"error", message:"ERROR DESCONOCIDO"});
    }
});

//ELIMINAR UN PRODUCTO DEL CARRO
router.delete('/api/carts/:cartId/:productId', async (req, res) => {
    try {
      const cartId = req.params.cartId;
      const productId = req.params.productId;
      const quantity = req.body.quantity;

      const cart = await cartManager.getCartById(cartId);
        if(cart){
            const product = await productManager.getProductById(productId);
            if(product){
                const response  = await cartManager.deleteProductFromCart(cartId,productId,quantity);

                res.json({status:"success", message:response});
            } else {
                res.status(400).json({status:"error", message:"No es posible eliminar este producto"});
            }
        } else {
            res.status(400).json({status:"error", message:"el carrito no existe"});
        }
    } catch (error) {
        res.status(400).json({status:"error", message:"ERROR DESCONOCIDO"});
    }
});

//ACTUALIZACIÓN CARRO
router.put('/api/carts/:cid', async (req, res) => {
    const cartId = req.params.cid;
    const updatedCart = req.body;
    const cart = await cartManager.getCartById(cartId)
    try {
        if(cart){
            res.json({status:"success", data:cart});
        } else {
            res.status(400).json({status:"error", message:"el carrito no existe"});
        }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

//ACTUALIZA UN PRODUCTO DENTRO DEL CARRO
router.put('/api/carts/:cid/products/:pid', async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = req.body.quantity;
    const cart = await cartManager.getCartById(cartId);
    try {
        if(cart){
            const product = await productManager.getProductById(productId);
            if(product){
                const response  = await cartManager.updateProduct(cartId,productId);
                res.json({status:"success", message:response});
            } else {
                res.status(400).json({status:"error", message:"El producto no esta agregado en el carro"});
            }
        } else {
            res.status(400).json({status:"error", message:"el carrito no existe"});
        }
    } catch (error) {
        res.status(400).json({status:"error", message:"ERROR DESCONOCIDO"});
    }
});

//ELIMINAR TODOS LOS PRODUCTOS DEL CARRO
router.delete('/api/carts/:cid', async (req, res) => {
    try {
      const cartId = req.params.cid;
      const cart = await cart.findById(cartId);
      if (cart) {
        cart.products = []; // Eliminar todos los productos del carrito
        await cart.save();
        res.json({ status: 'success', message: 'Los productos se han eliminados, el carro se encuentra vacio' });
      } else {
        res.status(404).json({ status: 'error', message: 'El carrito no existe' });
      }
    } catch (error) {
      res.status(400).json({ status: 'error', message: 'Error desconocido' });
    }
  });
  
//NO ENTENDI LA INSTRUCCIÓN:
//Esta vez, para el modelo de Carts, en su propiedad products, el id de cada producto generado dentro del array tiene que hacer referencia al modelo de Products. Modificar la ruta /:cid para que al traer todos los productos, los traiga completos mediante un “populate”. De esta manera almacenamos sólo el Id, pero al solicitarlo podemos desglosar los productos asociados.

export{router as cartsRouter};
