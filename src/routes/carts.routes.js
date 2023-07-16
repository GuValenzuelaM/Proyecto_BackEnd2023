//Importamos la clase router de la libreria express
import {Router} from "express";
import { CartsMongo } from "../daos/managers/carts.mongo.js";
import { ProductsMongo } from "../daos/managers/products.mongo.js";

const router = Router();
const cartService = new CartsMongo();
const productsService = new ProductsMongo();

//Crea una nuevo carrito
router.post("/", async(req,res)=>{
        try {
            const cartCreated = await cartService.create();
            res.json({status:"success", data:cartCreated});
        } catch (error) {
            res.status(400).json({status:"error",message:error.message});
        }
});

//Muestra los productos que se encuentran en el carrito
router.get("/:cid",async(req,res)=>{
    try {
        const cartId = req.params.cid;
        //Busca si el carro existe
        const cart = await cartService.get(cartId);
        res.json({status:"success", data:cart});
    } catch (error) {
        res.json({status:"error", message:error.message});
    }
});

//Agrega productos al carrito (IMPORTANTE MODIFICAR LOS CONDICIONALES)
router.put("/:cid/:pid",async(req,res)=>{
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const quantity = req.body.quantity;
        //La función get verifica la existencia del carrito
        const cart = await cartService.get(cartId);
        //Verifica la existencia del producto
            if(!productId){
                res.status(400).json({status:"error", message:`No se puede agregar el producto ${productId}`});
            } else{
                const result = await cartService.addProduct(cartId,productId);
                res.json({status:"success", data:result});
            }
    } catch (error) {
        res.json({status:"El carrito no existe", message:error.message});
    }
});

router.get("/",async(req,res)=>{
    try {
        const cart = await cartService.getCarts();
        res.json({status:"success",data:cart});
    } catch (error) {
        res.status(400).json({status:"error", message:"Hubo un error al obtener el carrito"});
    }
});


/*
//MOSTRAR EL CARRO
router.get("/:cid", async(req,res)=>{
    try {
        const cartId = req.params.cid;
        const cart = await cartService.getCartById(cartId);
        if(cart){
            console.log(cart)
            res.json({status:"success", data:cart});
        } else{
            res.status(400).json({status:"error",message:"El carro no existe"});
        }
    } catch (error) {
        res.status(400).json({status:"error",message:error.message});
    }
});
*/

//AGREGAR UN PRODUCTO AL CARRO
router.post("/:cid/product/:pid", async(req,res)=>{
    try {
        //Busca si existe el cartId
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const cart = await cartService.getCart(cartId);
        if(cart){
            if(productId){
                const existingProductIndex = cart.products.findIndex(prod => prod.productId === productId);
                if(existingProductIndex){
                    cart.products[existingProductIndex].quantity += 1;
                    console.log(`Se ha agregado una unidad del producto ${productId}`);
                } else{
                    cart.products.push({ productId: productId, quantity: 1 });
                    console.log(`Se ha agregado un nuevo producto ${productId}`);
                }
            } else{
                console.log(`El producto ${productId} no existe`);
            }
        } else{
            const cart = await createCart(cart)
            console.log(`Se ha creado tu carro ${cart}`);
            cart.products.push({productId:productId, quantity:1});
            console.log(`Se ha agregado un nuevo producto ${productId} a tu carro ${cart}`);
        }
    }catch(error) {
        res.status(400).json({status:"error", message:"ERROR DESCONOCIDO"});
    } 
});

//                res.json({status:"success", message:response});


//ELIMINAR UN PRODUCTO DEL CARRO
router.delete('/api/carts/:cartId/:productId', async (req, res) => {
    try {
      const cartId = req.params.cartId;
      const productId = req.params.productId;
      const quantity = req.body.quantity;

      const cart = await cartService.getCartById(cartId);
        if(cart){
            const product = await productManager.getProductById(productId);
            if(product){
                const response  = await cartService.deleteProductFromCart(cartId,productId,quantity);
                res.json({status:"success", message:response});
            } else {
                res.status(400).json({status:"error", message:"No es posible eliminar este producto"});
            }
        } else {
            res.status(400).json({status:"error", message:"el carrito no existe"});
        }
    } catch (error) {
        res.status(400).json({status:"error", message:"Revisa el código, algo del try no funcionó"});
    }
});

//ACTUALIZACIÓN CARRO
router.put('/api/carts/:cid', async (req, res) => {
    const cartId = req.params.cid;
    const updatedCart = req.body;
    const cart = await cartService.getCartById(cartId)
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
router.put("/:cid/:pid",async(req,res)=>{
    const cartId = req.params.cid;
    const productId = req.params.pid;
    //const quantity = req.body.quantity;
    const cart = await cartService.getCartById(cartId);
    try {
        if(cart){
            const existingProductIndex = cart.products.findIndex(prod => prod.productId === productId);
            if (!productId) {
                // El producto no existe
                console.log(`El producto ${productId} no existe`);
                return cart;
            } else {
                const cart = await cartService.addProduct(cartId,productId);
                console.log(`Se ha agregado el producto ${productId} a tu carro ${cartId}`);
                return cart;
            }
        } else {
            res.status(400).json({status:"error", message:"el carrito no existe"});
        }
    } catch (error) {
        res.status(400).json({status:"error", message:"Revisa el código, algo del try no funcionó"});
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

export{router as cartsRouter};
