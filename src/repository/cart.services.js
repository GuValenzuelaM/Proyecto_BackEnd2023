//Importa el DAO de Carts desde el módulo "factory"
import {cartsDao} from "../daos/factory.js";

export class CartsService {
    
    static async createCart(cart) {
        return cartsDao.createCart(cart);
    };
    
    static async getCartById(cartId) {
        return cartsDao.getCartById(cartId);
    };
    
    static async updateCart(cartId) {
        return cartsDao.updateCart(cartId);
    };

    static async addProductToCart(cartId, productId) {
        return cartsDao.addProductToCart(cartId, productId);
    };

    static async deleteProductFromCart(cartId, productId) {
        return cartsDao.deleteProductFromCart(cartId, productId);
    };

    static async deleteCartId(cartId) {
        return cartsDao.deleteCartId(cartId);
    };

    static async updateQuantity(cartId, productId, quantity) {
        return cartsDao.updateQuantity(cartId, productId, quantity);
    };

    //BORRAR?
    static async getPopulate() {
        return cartsDao.getPopulate();
    };

}