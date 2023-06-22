import {__dirname} from "../../utils.js";
 import {options} from "../../config/options.js";
 import path from "path";

 export class ProductsFiles{
     constructor(){
         this.path = path.join(__dirname,`/daos/files/${options.fileSystem.products}`)
     };

     fileExists(){
        console.log(this.path)
        return fs.existsSync(this.path);
    }

    async getProducts(){ 
        try{
            if(this.fileExists()){
                const contenido = await fs.promises.readFile(this.path,"utf-8");
                const contenidoJson = JSON.parse(contenido);
                return contenidoJson;
            }else{
                throw new Error("El archivo no existe");
            }
        }catch(error){
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

    generateId(products){
        let newId;
        if(!products.length){
            newId = 1;
        } else{
            newId = products[products.length-1].id+1;
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

    async updateProducts(id, product){
        try {
            if(this.fileExists()){
                const content = await fs.promises.readFile(this.path,"utf-8");
                const products = JSON.parse(content);
                const productIndex = products.findIndex(prod=>prod.id == id);
                if(productIndex >= 0){
                    products[productIndex] ={
                        ...products[productIndex],
                        ...product
                    }
                    const productId = products[productIndex].id;
                    if(id == productId){
                        await fs.promises.writeFile(this.path,JSON.stringify(products,null,2));
                        return products[productIndex];
                    }else{
                        throw new Error("No se puede modificar el id");
                    }

                } else {
                    throw new Error(`El producto con el id ${id} no existe`);
                }
            } else {
                throw new Error("El archivo no existe");
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async deleteProducts(id){
        try {
            if(this.fileExists()){
                const content = await fs.promises.readFile(this.path,"utf-8");
                const products = JSON.parse(content);
                const productIndex = products.findIndex(prod=>prod.id == id);
                if(productIndex >= 0){
                    products.splice(productIndex, 1);
                    await fs.promises.writeFile(this.path,JSON.stringify(products,null,2));
                    return id;
                } else {
                    throw new Error(`El producto con el id ${id} no existe`);
                }
            } else {
                throw new Error("El archivo no existe");
            }
        } catch (error) {
            throw new Error(error.message);
        }

    }
}   