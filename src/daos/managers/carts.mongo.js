import {cartsModel} from "../models/carts.model.js";

 export class CartsMongo{
    constructor(){
        this.model = cartsModel;
    };

    async create(){
        const cart = {};
        try {
            const data = await this.model.create(cart);
            return data;
        } catch (error) {
            throw new Error(`Error al crear el carrito ${error.message}`);
        }
    };

    async get(cartId){
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

    /*
    async getCart(cartId){
        try {
            const cart = await this.model.findOne({_id:cartId});
            if(!cart){
                const cart = await createCart(cart)
                console.log("Se ha creado un carro vacío");
                throw new Error(`No se encontro el carrito ${error.message}`);
            }
            //convertir el formato bson a json
            const data = JSON.parse(JSON.stringify(result));
            return data;
        } catch (error) {
            throw new Error(`Error create cart ${error.message}`);
        }
    };
*/

async addProduct(cartId, productId) {
    try {
        const cart = await this.get(cartId);
        if(!productId){
            cart.products.push({productId:productId, quantity:1});
            console.log(`Se ha agregado una nueva unidad del producto ${productId} a tu carro ${cartId}`);
            res.json({ status: "success", data: cart });
        } else {
            cart.products.push({ productId: productId, quantity: 1 });
            console.log(`Se ha agregado un nuevo producto ${productId} a tu carro ${cartId}`);
        }
    } catch (error) {
        throw new Error(`Error al agregar producto al carrito ${error.message}`);
      }
}


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

    async getPopulate(id){
        try {
            const carrito = await this.model.findById(id).populate('products._id');
            if(!carrito){
                throw new Error("El carrito no existe")
                console.log("El carrito no existe")
            }        
            return carrito;
            console.log(carrito);
        } catch (error) {
            throw new Error(`Error al obtener carrito ${error.message}`);
            console.log("Error al obtener carrito")
        } 
    };

 } 