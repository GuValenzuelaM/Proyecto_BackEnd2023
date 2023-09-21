// IMPORTA EL DAO DE PRODUCTOS DESDE EL MÓDULO "factory"
import {productsDao} from "../daos/factory.js"

export class ProductsService {
    //OBTIENE UNA PAGINACIÓN DE PRODUCTOS
    static async getPaginate(query, options) {
        return productsDao.getPaginate(query, options);
    }

    //OBTIENE TODOS LOS PRODUCTOS
    static async getProducts() {
        return productsDao.getProducts();
    };

    //OBTIENE UN PRODUCTO POR SU ID
    static async getProductById(id) {
        return productsDao.getProductById(id);
    };

    //CREA UN NUEVO PRODUCTO
    static async createProduct(product) {
        return productsDao.createProduct(product);
    };
    //ACTUALIZA UN PRODUCTO
    static async updateProduct(id, product) {
        return productsDao.updateProduct(id, product);
    };
    //ELIMINA UN PRODUCTO
    static async deleteProduct(id) {
        return productsDao.deleteProduct(id);
    };

};

/*
createProduct
getProductById
getProductById
updateProduct
deleteProduct
getPaginate
*/