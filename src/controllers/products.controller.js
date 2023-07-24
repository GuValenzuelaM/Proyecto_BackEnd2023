import {ProductsService} from "../repository/products.services.js";

export class ProductsController{ 

    //Función para listar productos filtrados ,ordenados y paginados
    static getProducts = async(req,res)=>{
        try {
            const {limit=10,page=1,sort,category,stock} = req.query;
            if(!["asc","desc"].includes(sort)){
                res.json({status:"error", message:"ordenamiento no valido, solo puede ser asc o desc"});
            };
            const sortValue = sort === "asc" ? 1 : -1;
            const stockValue = stock === 0 ? undefined : parseInt(stock);
            console.log("limit: ", limit, "page: ", page, "sortValue: ", sortValue, "category: ", category, "stock: ", stock);
            let query = {};
            if(category && stockValue){
                query = {category: category, stock:stockValue}
            } else {
                if(category || stockValue){
                    if(category){
                        query={category:category}
                    } else {
                        query={stock:stockValue}
                    }
                }
            }
            // console.log("query: ", query)
            const baseUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
            //baseUrl: http://localhost:8080/api/products
            
            //Define ruta variable del localhost
            const result = await ProductsService.getPaginate(query, {
                page,
                limit,
                sort:{price:sortValue},
                lean:true
            });
            // console.log("result: ", result);
            const response = {
                status:"success",
                payload:result.docs,
                totalPages:result.totalPages,
                prevPage: result.prevPage,
                nextPage: result.nextPage,
                page:result.page,
                hasPrevPage:result.hasPrevPage,
                hasNextPage:result.hasNextPage,
                prevLink: result.hasPrevPage ? `${baseUrl}?page=${result.prevPage}` : null,
                nextLink: result.hasNextPage ? `${baseUrl}?page=${result.nextPage}` : null,
            }
            console.log("response: ", response);
            res.json(response); 
        } catch (error) {
            res.json({status:"error", message:error.message});
        }
    };

    //Función para obtener la información de un producto según ID
    static getProductById = async(req,res)=>{
        try{
            const id = req.params.pid;
            if(id){
                const productId = await ProductsService.getProductById(id);
                res.json({status:"success", data: productId});
            }else{
                res.status(400).json({status: "error", data: "el id no es un numero"});
            } 
        }catch(error){
            res.status(400).json({status: "error", data: error.message});
        } 
    };

    //Función para crear un producto a la base de datos    
    static createProduct = async(req,res)=>{
        try {
            const productInfo = req.body;
            const productCreated = await ProductsService.createProduct(productInfo);
            res.json({status:"success", data:productCreated});
        } catch (error) {
            res.json({status:"error", message:error.message});
        }
    };

    //Función para eliminar un producto
    static deleteProducts = async(req, res)=>{
        try{
            const id = req.params.pid;
            if(id){
                const deleteProduct = await ProductsService.deleteProducts(id);
                res.json({status: "success", data: "Se ha eliminado el producto con el id: " + deleteProduct})
            }else{
                res.status(400).json("Error, el id no es un número");
            } 
        }catch(error){
            res.status(400).json({status: "error", data: error.message});
        }
    };
    
    //Función para actualizar un producto
    static updateProducts = async(req, res)=>{
        try{
            const product = req.body;
            const id = req.params.pid;
            if(id){
                const update = await ProductsService.updateProduct(id, product);
                res.json({status: "success", data: update})
            }else{
                res.status(400).json("Error, ID del producto no ha sido encontrado");
            } 
        }catch(error){
            res.status(400).json({status: "error", data: error.message});
        }
    
    };
};