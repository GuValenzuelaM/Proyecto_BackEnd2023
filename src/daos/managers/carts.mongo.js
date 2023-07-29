import {cartsModel} from "../models/carts.model.js";

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

    //Obtiene carrito de compras por su ID en la base de datos (mongoose)
    async getCartById(cartId){
        try {
            const result = await this.model.findOne({_id:cartId});
            if(!result){
                throw new Error(`No se encontro el carrito ${error.message}`);
            }
            //convertir el formato bson a json
            const data = JSON.parse(JSON.stringify(result));
            return data;
        } catch (error) {
            throw new Error(`Error create cart ${error.message}`);
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
            console.log(cart)
            console.log(existingProductIndex)
            if (existingProductIndex >= 0) {
                // El producto ya está presente en el carrito, sumar 1 a quantity
                cart.products[existingProductIndex].quantity += 1;
                const result = await this.model.findByIdAndUpdate(cartId,cart,{new:true});
                console.log(`Se ha agregado el producto ${productId} a tu carro ${cartId}`);
                return result;
            } else {
                // El producto no estaba en el carrito, agregarlo con quantity igual a 1
                cart.products.push({ productId: productId, quantity: 1 });
                const result = await this.model.findByIdAndUpdate(cartId,cart,{new:true});
                console.log(`Se ha agregado el producto ${productId} a tu carro ${cartId}`);
                return cart;
            }  
        } catch (error) {
            throw new Error(`Error al agregar producto al carrito ${error.message}`);
            console.log("error")
        }
    }

    //Borra un producto del carrito
    async deleteProductFromCart(cartId, productID) {
        try {
            const cart = await this.model.findById(cartId);
    
            if (cart) {
                const arrayCart = cart.products;
    
                const productIds = arrayCart.map((item) => item.productId.toString());
    
                const verifyExistance = productIds.includes(productID);
    
                // Si el producto existe en el carrito, se elimina
                if (verifyExistance) {
                    const data = await this.model.findOneAndUpdate(
                        { _id: cartId },
                        { $pull: { products: { productId: productID } } },
                        { new: true }
                    );
                    const updatedCart = await this.model.find({ _id: cartId });
                    return updatedCart;
                } else {
                    throw new Error(`No existe el producto con ID ${productID}`);
                }
            }
        } catch (error) {
            throw new Error(error.message);
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
            console.log(updatedCart)
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
                console.log("El carrito no existe");
            } else{
                //Caso contrario devuelve el carro con la inforamción de los productos
                return carrito;
                console.log(carrito);
            }
        } catch (error) {
            //Si el código falla, enterga mensaje de error
            throw new Error(`Error al obtener carrito ${error.message}`);
            console.log("Error al obtener carrito");
        }
    };
} 

/* FUNCIONES CARTS MONGO
-CARRITOS-
createCart
getCartById
updateCart
deleteProductFromCart

-PRODUCTOS-
addProductToCart
deleteCartId
updateQuantity

-INFO-
getPopulate
*/