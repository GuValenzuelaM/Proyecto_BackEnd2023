import {__dirname} from "../../utils.js";
import {options} from "../../config/options.js";
import path from "path";

export class CartFiles{
    constructor(){
        this.path = path.join(__dirname,`/daos/files/${options.fileSystem.carts}`)
    };

    fileExists(){
        return fs.existsSync(this.path);
    }

    generateId(products){
        let newId;
        if(!carts.length){
            newId = 1;
        } else{
            newId = carts[carts.length-1].id+1;
        }
        return newId;
    }

    /*
    async addCart(){
        try {
            const cart={
                products:[]
            }
            if(this.fileExists()){
                const content = await fs.promises.readFile(this.path,"utf-8");
                const carts = JSON.parse(content);
                const cartId = this.generateId(carts);
                cart.id = cartId;

                carts.push(cart);
                await fs.promises.writeFile(this.path,JSON.stringify(carts,null,2));
                return cart;
            }else{
                const cartId = this.generateId([]);
                cart.id = cartId;

                await fs.promises.writeFile(this.path,JSON.stringify([cart],null,2));
                return cart;
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }
    */

    async getCartById(id){
        try {
            const cartId = parseInt(id);
            //Si el archivo existe 
            if(this.fileExists()){
                const content = await fs.promises.readFile(this.path,"utf-8");
                const carts =JSON.parse(content);
                //Crea una variable que capture el objeto "product" dentro del arreglo "products" que tenga el mismo id
                const cart = carts.find(item=>item.id === cartId);
                //si el objeto "cart" existe, la consola muestra todas las propiedades de ese objeto
                if(cart){
                     return cart;
                //Si no encuentra el archivo "carts.json" entrega un mensage de error que indica que el id no ha sido encontrado
                } else{
                    return null;
                }
            //Si el archivo "products.json" no esta creado se muestra un mensaje de error
            } else{
                throw new Error(`El archivo no existe`);
            }
        } catch (error) {
            //console.log(error.message)
            throw new Error(error.message);
        }
    }

    async addProductToCart(cartId,productId){
        try {
            if(this.fileExists()){
                const content = await fs.promises.readFile(this.path,"utf-8");
                const carts = JSON.parse(content);
                const existingCart = carts.find(cart => cart.id === parseInt(cartId));
                if (existingCart) {
                    // Si el carrito existe
                    const productIndex = existingCart.products.findIndex(prod => prod.product === parseInt(productId));
                    console.log(productId, productIndex);
                    if (productIndex >= 0) {
                        existingCart.products[productIndex].quantity++;
                    } else {
                        const newCartProduct = {
                            product: parseInt(productId),
                            quantity: 1
                        };
                        existingCart.products.push(newCartProduct);
                    }
                    await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
                    return existingCart.products;
                } else {
                    throw new Error("El carrito no existe");
                }
            } else {
                throw new Error("El archivo no existe");
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }
}