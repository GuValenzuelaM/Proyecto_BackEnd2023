// IMPORTA EL DAO DE PRODUCTOS DESDE EL MÓDULO "factory"
import {productsDao} from "../daos/factory.js"

export class ProductsService {

    static async createProduct(product) {
        return productsDao.createProduct(product);
    };
    
    static async getProductById(id) {
        return productsDao.getProductById(id);
    };

    static async updateProduct(id, product) {
        return productsDao.updateProduct(id, product);
    };

    static async deleteProduct(id) {
        return productsDao.deleteProduct(id);
    };

    static async getPaginate(query, options) {
        return productsDao.getPaginate(query, options);
    }

    static async getProducts() {
        return productsDao.getProducts();
    };    
}