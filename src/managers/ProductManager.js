import fs from "fs";
import path from "path";
import { __dirname } from "../utils.js";

class ProductManager{
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

    async addProduct(product){
        try { 
            //Si existe el archivo "products.json" es porque el arreglo products ya tiene productos
            if(this.fileExists()){
                const content = await fs.promises.readFile(this.path,"utf-8");
                //Al ser un archivo JSON se debe aplicar parse para mantener sus propiedades
                const products = JSON.parse(content);
                
                const existingProduct = products.find(item => item.code === product.code);
                if (existingProduct) {
                    throw new Error("El código de producto ya se encuentra incluido");
                }

                //Se crea una constante utilizando la función generateId
                const productId = this.generateId(products);
                //Sobreescribe la propeidad "id" según la función "generateId"
                product.id = productId;
                product.status ="true";
                if(isNaN(product.price) || isNaN(product.stock)){
                    throw new Error("El precio debe ser un número");
                } else{
                    products.push(product);
                    //Sobreescribe el archivo JSON manteniendo el formato del archivo (tipo cascada)
                    await fs.promises.writeFile(this.path,JSON.stringify(products,null,2));
                    return product;    
                }
            }
            else {
                if(isNaN(product.price) || isNaN(product.stock)) {
                    throw new Error("El precio debe ser un número");
                    //En caso que no exista el archivo "products.json" se genera un arreglo vacío y se aplica la función "generateId"
                    const productId = this.generateId([]);
                    //Sobreescribe la propeidad "id" según la función "generateId"
                    product.id = productId;
                    product.status ="true";
                    // console.log("product: ", product);
                    //Sobreescribe el archivo JSON manteniendo el formato del archivo (tipo cascada)
                    await fs.promises.writeFile(this.path,JSON.stringify([product],null,2));
                    return product;
            }};
        } catch (error) {
            // console.log(error.message);
            throw new Error(error.message);
        }
    };

    async getProduct(){
        try {
        //Si el archivo existe 
            if(this.fileExists()){
                const content = await fs.promises.readFile(this.path,"utf-8");
                const products =JSON.parse(content);
                if(!products.length>=0){
                    return products;
                //Si no encuentra el archivo "products.json" entrega un mensage de error que indica que el id no ha sido encontrado
                } else{
                    throw new Error(`El arreglo se encuentra vacio`);
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

    async getProductById(id){
        try {
            //Si el archivo existe 
            if(this.fileExists()){

                const content = await fs.promises.readFile(this.path,"utf-8");
                const products =JSON.parse(content);
                //Crea una variable que capture el objeto "product" dentro del arreglo "products" que tenga el mismo id
                const product = products.find(item=>item.id === parseInt(id));
                //si el objeto "product" existe, la consola muestra todas las propiedades de ese objeto
                if(product){
                    return product;
                //Si no encuentra el archivo "products.json" entrega un mensage de error que indica que el id no ha sido encontrado
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
    
    async updateProduct(id,product){
        try {
            if(this.fileExists()){
                const content = await fs.promises.readFile(this.path,"utf-8");
                const products = JSON.parse(content);
                const productId = parseInt(id)
                const productIndex = products.findIndex(item=>item.id === productId);
                if(productIndex>=0){
                    products[productIndex]={
                        ...products[productIndex],
                        ...product
                    }
                    await fs.promises.writeFile(this.path,JSON.stringify(products,null,2));
                    return `El producto con el id ${id} fue modificado`;
                } else {
                    throw new Error(`El producto con el id ${id} no existe`);
                }
            } else {
                throw new Error("El archivo no existe");
            }
        } catch (error) {
            // console.log(error.message);
            throw new Error(error.message);
        }
    };

    async deleteProduct(id){
        try {
            //Si el archivo existe 
            if(this.fileExists()){

                const content = await fs.promises.readFile(this.path,"utf-8");
                const products =JSON.parse(content);
                //Crea una variable que capture el objeto "product" dentro del arreglo "products" que no tenga el id utilizado en la función
                const product = products.filter(item=>item.id !==parseInt(id));
                //si el objeto "product" existe, la consola muestra todas las propiedades de ese objeto
                if(product){
                    const products=product
                    await fs.promises.writeFile(this.path,JSON.stringify(products,null,2));
                    return product;
                //Si no encuentra el archivo "products.json" entrega un mensage de error que indica que el id no ha sido encontrado
                } else{
                    throw new Error(`El producto con el id ${id} no existe`);
                }
            //Si el archivo "products.json" no esta creado se muestra un mensaje de error
            } else{
                throw new Error(`El archivo no existe`);
            }
        } catch (error) {
            //console.log(error.message)
            throw new Error(error.message);
        }
    };

}

export {ProductManager};