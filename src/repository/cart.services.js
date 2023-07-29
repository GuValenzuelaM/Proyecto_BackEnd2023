//Importa el DAO de Carts desde el módulo "factory"
import {cartsDao} from "../daos/factory.js";

export class CartsService {
    //AGREGA UN CARRITO NUEVO
    static async createCart(cart) {
        return cartsDao.createCart(cart);
    };
    //OBTIENE UN CARRITO POR SU ID
    static async getCartById(id) {
        return cartsDao.getCartById(id);
    };
    //ACTUALIZA UN CARRITO
    static async updateCart(cartId) {
        return cartsDao.updateCart(cartId);
    };
    //AGREGA UN PRODUCTO A UN CARRITO
    static async addProductToCart(cartId, productId) {
        return cartsDao.addProductToCart(cartId, productId);
    };
    //Elimna un producto del carrito
    static async deleteProductFromCart(cartId, productId) {
        return cartsDao.deleteProductFromCart(cartId, productId);
    };
    //Elimina todo el contenido del carrito
    static async deleteCartId(cartId) {
        return cartsDao.deleteCartId(cartId);
    };
    //ACTUALIZA LA CANTIDAD DE UN PRODUCTO EN UN CARRITO
    static async updateQuantity(cartId, productId, quantity) {
        return cartsDao.updateQuantity(cartId, productId, quantity);
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
*/