// IMPORTA EL DAO DE PRODUCTOS DESDE EL MÓDULO "factory"
import { productDAO } from "../daos/facotry.js"

export class ProductsService {
    //OBTIENE UNA PAGINACIÓN DE PRODUCTOS
    static async getPaginate(query, options) {
        return productDAO.getPaginate(query, options);
    }

    //OBTIENE TODOS LOS PRODUCTOS
    static async getProducts() {
        return productDAO.getProducts();
    };

    //OBTIENE UN PRODUCTO POR SU ID
    static async getProductById(id) {
        return productDAO.getProductById(id);
    };

    //CREA UN NUEVO PRODUCTO
    static async createProduct(product) {
        return productDAO.addProduct(product);
    };
    //ACTUALIZA UN PRODUCTO
    static async updateProduct(id, product) {
        return productDAO.updateProduct(id, product);
    };
    //ELIMINA UN PRODUCTO
    static async deleteProduct(id) {
        return productDAO.deleteProduct(id);
    };
};
