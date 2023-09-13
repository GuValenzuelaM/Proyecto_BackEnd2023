import {cartsModel} from "../models/carts.model.js";
import {logger} from "../../utils/logger.js"

 export class CartsMongo{
    constructor(){
        this.model = cartsModel;
    };
    
    //Crea un carrito
    async createCart(){
        const cart = {};
        try {
            const data = await this.model.create(cart);
            return data;
        } catch (error) {
            throw new Error(`Error al crear el carrito ${error.message}`);
        }
    };

    async getCartById(cartId){
        try {
            const cart = await this.model.findById(cartId);
            if(!cartsModel){
                throw new Error("el carrito no existe")
            }
            const result = JSON.parse(JSON.stringify(cart));
            return result;
        } catch (error) {
            throw new Error(`Error al obtener carrito ${error.message}`);
        }        
    };

/*
    //Obtiene carrito de compras por su ID en la base de datos (mongoose)
    async getCartById(cartId){
        try {
            const result = await this.model.findOne({_id:cartId});
            if(!result){
                throw new Error(`No se encontro el carrito ${error.message}`);
            }
            //convertir el formato bson a json
            //const data = JSON.parse(JSON.stringify(result));
            //return data;
            return result;
        } catch (error) {
            throw new Error(`Error getCartById ${error.message}`);
        }
    };
*/

    //Obtiene carrito de compras con sus productos
    async getProductsFromCart(cartId){
        try {
            const cartId = req.params.cid;
            const cart = await cartsService.get(cartId);
            logger.debug(cart);
            res.render("cart",cart);
        } catch (error) {
            res.json({status:"error", message:error.message});
        }
    };

    //Actualiza el carrito
    async updateCart(cartId, cart){
        try {
            const data = await this.model.findByIdAndUpdate(cartId,cart,{new:true});
            if(!data){
                throw new Error("el carrito no existe")
            }
            return data;
        } catch (error) {
            throw new Error(`Error al actualizar el carrito ${error.message}`);
        }
    };
    
    async addProductToCart(cartId, productId) {
        try {
            const cart = await this.getCartById(cartId);
            // Verificar si el producto ya está agregado en el carrito
            const existingProductIndex = cart.products.findIndex(products => products.productId._id === productId);
            //console.log(cart)
            //console.log(existingProductIndex)
            if (existingProductIndex >= 0) {
                // El producto ya está presente en el carrito, sumar 1 a quantity
                cart.products[existingProductIndex].quantity += 1;
                const result = await this.model.findByIdAndUpdate(cartId,cart,{new:true});
                logger.debug(`Se ha agregado el producto ${productId} a tu carro ${cartId}`);
                return result;
            } else {
                // El producto no estaba en el carrito, agregarlo con quantity igual a 1
                cart.products.push({ productId: productId, quantity: 1 });
                const result = await this.model.findByIdAndUpdate(cartId,cart,{new:true});
                logger.debug(`Se ha agregado el producto ${productId} a tu carro ${cartId}`);
                return cart;
            }
        } catch (error) {
            throw new Error(`Error al agregar producto al carrito ${error.message}`);
            logger.error("error")
        }
    }

    //Borra un producto del carrito
    async deleteProductFromCart(cartId, productId) {
        try {
            const cart = await this.getCartById(cartId);
            const existingProductIndex = cart.products.findIndex(products => products.productId._id === productId);
            //console.log(cart)
            //console.log(existingProductIndex)
            // Si el producto existe en el carrito, se elimina
            if (existingProductIndex >= 0) {
                cart.products[existingProductIndex].quantity -= 1;
                if (cart.products[existingProductIndex].quantity <= 0) {
                cart.products.splice(existingProductIndex, 1);
                }
                const result = await this.model.findByIdAndUpdate(cartId,cart,{new:true});
                logger.debug(`Se ha eliminado una unidad del producto ${productId} a tu carro ${cartId}`);
                return result;
            } else {
                    // El producto no estaba en el carrito
                    logger.debug(`El producto ${productId} no se encontró en el carrito ${cartId}`);
                    return cart;
            }  
        } catch (error) {
            throw new Error(`Error al eliminar producto en carrito ${error.message}`);
            logger.error(error.message)
        }
    }        
    
    //Elimina todo el contenido del carrito
    async deleteCartId(cartId) {
        try {
            const updatedCart = await this.model.findOneAndUpdate(
                { _id: cartId },
                { $unset: { products: 1 } },
                //{ $pull: { products: { $exists: true } } },
                { new: true }
            );
            return updatedCart;
        } catch (error) {
            throw new Error(`Error ${error.message}`);
        }
    }

    //Actualiza la cantidad de un producto según ID en un carrito determinado
    async updateQuantity(cartId, productId, quantity) {
        try {
          //Buscar el carrito por ID y verificar si contiene el producto según ID.
          const updatedCart = await this.model.findOneAndUpdate(
            { _id: cartId, "products.productId": productId },
            //Incrementar/Disminuye la cantidad del producto usando $inc en arreglo "products".
            { $inc: { "products.$.quantity": quantity } },
            { new: true });
            logger.debug(updatedCart)
          // Buscar y retornar el carrito actualizado con la información de los productos.
          const cartWithProductsInfo = await this.model.findById(cartId).populate('products.productId');
          return cartWithProductsInfo;
        } catch (error) {
          throw new Error(error.message);
        }
      }

    //Recopila inforamción de productos según ID del carrito
    async getPopulate(id){
        try {
            //Busca la información de los productos incluidos en un cartID determinado
            const carrito = await this.model.findById(id).populate('products._id');
            // Si el carrito no existe entrega mensaje de error
            if (!carrito) {
                throw new Error("El carrito no existe");
                logger.debug("El carrito no existe");
            } else{
                //Caso contrario devuelve el carro con la inforamción de los productos
                return carrito;
                logger.debug(carrito);
            }
        } catch (error) {
            //Si el código falla, enterga mensaje de error
            throw new Error(`Error al obtener carrito ${error.message}`);
            logger.error("Error al obtener carrito");
        }
    };
} 

/* FUNCIONES CARTS MONGO
-CARRITOS-
createCart  ok
getCartById ok
updateCart
deleteProductFromCart ok

-PRODUCTOS-
addProductToCart ok
deleteCartId
updateQuantity

-INFO-
getPopulate
*/