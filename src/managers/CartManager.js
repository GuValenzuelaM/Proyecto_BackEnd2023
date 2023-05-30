import fs from "fs";
import path from "path";
import { __dirname } from "../utils.js";

class CartManager{
    constructor(pathName){
        this.path=path.join(__dirname,`/files/${pathName}`);
    } 

    //función que determina si el archivo existe, en file system usamos el método asincrono en la variable "this.path" (true/false)
    fileExists(){
        return fs.existsSync(this.path);
    };

    //Función "generateId", contiene objetivos denominados "products".
    generateId(products){
        //Se crea una variable newId
        let newId;
        //En caso que el arreglo "products" no este definido, se asigna un valor de 1 a la variable newId
        if(!products.length){
            newId=1;
        //En caso que exista el arreglo "products", la variable newId se calcula sumandole 1 al id del último objeto del arreglo products (recordar que el primer objeto dentro del arreglo tiene la posición 0)
        } else{
            newId=products[products.length-1].id+1;
        }
        return newId;
    }

    async addCart(){
        try { 
            const cart={
                products:[]
            };
            //Si existe el archivo "cart.json" es porque el arreglo products ya tiene productos
            if(this.fileExists()){
                const content = await fs.promises.readFile(this.path,"utf-8");
                //Al ser un archivo JSON se debe aplicar parse para mantener sus propiedades
                const carts = JSON.parse(content);
                //Se crea una constante utilizando la función generateId
                const cartId = this.generateId(carts);
                //Sobreescribe la propeidad "id" según la función "generateId"
                cart.id = cartId;
                carts.push(cart);
                //Sobreescribe el archivo JSON manteniendo el formato del archivo (tipo cascada)
                await fs.promises.writeFile(this.path,JSON.stringify(carts,null,2));
                return cart;    
            }else {        
                //En caso que no exista el archivo "carts.json" se genera un arreglo vacío y se aplica la función "generateId"
                 const cartId = this.generateId([]);
                //Sobreescribe la propeidad "id" según la función "generateId"
                cart.id = cartId;
                // console.log("cart: ", cart);
                //Sobreescribe el archivo JSON manteniendo el formato del archivo (tipo cascada)
                await fs.promises.writeFile(this.path,JSON.stringify([cart],null,2));
                return cart;
            };
        } catch (error) {
            // console.log(error.message);
            throw new Error(error.message);
        }
    };

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
                const cartIndex=carts.findIndex(item=>item.id === parseInt(cartId));
                if(cartIndex>=0){
                    const productIndex = carts[cartIndex].products.findIndex(item=>item.product === parseInt(productId));
                    if(productIndex>=0){
                        carts[cartIndex].products[productIndex]={
                            product: carts[cartIndex].products[productIndex].product,
                            quantity: carts[cartIndex].products[productIndex].quantity+1
                        }
                        await fs.promises.writeFile(this.path,JSON.stringify(carts,null,2));
                    } else {
                        const newCartProduct={
                            product:parseInt(productId),
                            quantity:1
                        }
                        carts[cartIndex].products.push(newCartProduct);
                        await fs.promises.writeFile(this.path,JSON.stringify(carts,null,2));
                    }
                    return "producto agregado"
                } else {
                    throw new Error(`El carrito no existe`);
                }
            } else {
                throw new Error("El archivo no existe");
            }
        } catch (error) {
            // console.log(error.message);
            throw new Error(error.message);
        }
    };

    async deleteProductFromCart(cartId, productId) {
        try {
          if (this.fileExists()) {
            const content = await fs.promises.readFile(this.path, 'utf-8');
            const carts = JSON.parse(content);
            const cartIndex = carts.findIndex((item) => item.id === parseInt(cartId));
            if (cartIndex >= 0) {
              const productIndex = carts[cartIndex].products.findIndex(
                (item) => item.product === parseInt(productId)
              );
              if (productIndex >= 0) {
                carts[cartIndex].products.splice(productIndex, 1);
                await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
                return 'Producto eliminado del carrito';
              } else {
                throw new Error('El producto no existe en el carrito');
              }
            } else {
              throw new Error('El carrito no existe');
            }
          } else {
            throw new Error('El archivo no existe');
          }
        } catch (error) {
          throw new Error(`Error al eliminar el producto del carrito: ${error.message}`);
        }
    }      

}
    export {CartManager};