# Proyecto_BackEnd2023




    
    async deleteProduct(id){
        try {
            //Si el archivo existe 
            if(this.fileExists()){

                const content = await fs.promises.readFile(this.path,"utf-8");
                const products =JSON.parse(content);
                //Crea una variable que capture el objeto "product" dentro del arreglo "products" que no tenga el id utilizado en la función
                const product = products.filter(item=>item.id !==id);
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