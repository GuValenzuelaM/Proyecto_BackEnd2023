//Importa el DAO de Carts desde el módulo "factory"
import { cartsDAO } from "../daos/factory.js";

export class CartsService {
    //AGREGA UN CARRITO NUEVO
    static async addCart(cart) {
        return cartsDAO.addCart(cart);
    };
    //OBTIENE UN CARRITO POR SU ID
    static async getCartById(id) {
        return cartsDAO.getCartById(id);
    };
    //AGREGA UN PRODUCTO A UN CARRITO
    static async addProductToCart(cartId, productID) {
        return cartsDAO.addProductToCart(cartId, productID);
    };
    //ELIMINA UN PRODUCTO DE UN CARRITO
    static async deleteProducts(cartId, productID) {
        return cartsDAO.deleteProducts(cartId, productID);
    };
    //ACTUALIZA UN CARRITO
    static async updateCart(cartId) {
        return cartsDAO.updateCart(cartId);
    };
    //ACTUALIZA LA CANTIDAD DE UN PRODUCTO EN UN CARRITO
    static async updateQuantity(cartId, productID, quantity) {
        return cartsDAO.updateQuantity(cartId, productID, quantity);
    };
    //ELIMINA UN CARRITO
    static async deleteCart(cartId) {
        return cartsDAO.deleteCart(cartId);
    };
}