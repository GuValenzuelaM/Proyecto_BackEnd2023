import { productsModel } from "../models/products.model.js";

 export class ProductsMongo{
    constructor(){
        this.model = productsModel;
    }

    async createProduct(product){
        try {
            const newProduct = await this.model.create(product);
            return newProduct;
        } catch (error) {
            throw new Error(`Error al crear el producto ${error.message}`);
        }
    };

    async getProducts(){
         try {
             const products = await this.model.find();
             return JSON.parse(JSON.stringify(products));
         } catch (error) {
             throw new Error(`Error al obtener productos ${error.message}`);
         }
    };

    async getProductById(id){
        try {
            const product = await this.model.findById(id);
            if(!product){
                throw new Error(`el producto ${id} no existe`)
            } else{
                return JSON.parse(JSON.stringify(product));
                console.log(`el producto ${id} existe en el arreglo de productos`)
            }
        } catch (error) {
            throw new Error(`Error al obtener producto ${error.message}`);
        }
    };

    async updateProduct(id,product){
        try {
            const data = await this.model.findByIdAndUpdate(id,product,{new:true});
            if(!data){
                throw new Error("el producto no existe")
            }
            return data;
        } catch (error) {
            throw new Error(`Error al actualizar el producto ${error.message}`);
        }
    };

    async deleteProduct(id){
        try {
            await this.model.findByIdAndDelete(id);
            return {message: `producto eliminado ${id}`};
        } catch (error) {
            throw new Error(`Error al eliminar el producto ${error.message}`);
        }
    };

    async getPaginate(query={},options={}){
        try {
            const result = await this.model.paginate(query, options);
            return result;
        } catch (error) {
            throw new Error(`Error get all products ${error.message}`);
        }
    };
};