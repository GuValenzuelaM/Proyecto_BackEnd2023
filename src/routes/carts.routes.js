//Importamos la clase router de la libreria express
import {Router} from "express";
import { CartsMongo } from "../daos/managers/carts.mongo.js";

const router = Router();
const cartsService = new CartsMongo();

router.post("/", async(req,res)=>{
        try {
            const cartCreated = await cartsService.create();
            res.json({status:"success", data:cartCreated});
        } catch (error) {
            res.status(400).json({status:"error",message:error.message});
        }
});

router.put("/:cid/:pid",async(req,res)=>{
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const cart = await cartService.get(cartId);
        // verificar que el producto exista antes de agregarlo al carrito.
        const result = await cartService.addProduct(cartId,productId);
        res.json({status:"success", data:result});
    } catch (error) {
        res.json({status:"error", message:error.message});
    }
});

router.get("/",async(req,res)=>{
    try {
        const cart = await cartsService.getCarts();
       res.json({status:"success",data:cart});
    } catch (error) {
        res.status(400).json({status:"error", message:"Hubo un error al obtener el carrito"});
    }
});

//MOSTRAR EL CARRO
router.get("/:cid", async(req,res)=>{
    try {
        const cartId = req.params.cid;
        const cart = await cartsService.getCartById(cartId);
        if(cart){
            res.json({status:"success", data:cart});
            console.log(cart)
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
        const cart = await cartsService.getCartById(cartId);
        if(cart){
            const product = await productManager.getProductById(productId);
            if(product){
                const response  = await cartsService.addProductToCart(cartId,productId);
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

      const cart = await cartsService.getCartById(cartId);
        if(cart){
            const product = await productManager.getProductById(productId);
            if(product){
                const response  = await cartsService.deleteProductFromCart(cartId,productId,quantity);

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
    const cart = await cartsService.getCartById(cartId)
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
    const cart = await cartsService.getCartById(cartId);
    try {
        if(cart){
            const product = await productManager.getProductById(productId);
            if(product){
                const response  = await cartsService.updateProduct(cartId,productId);
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
