import {ProductsService} from "../repository/products.services.js";
import {UsersService} from "../repository/users.services.js";
import {generateProduct} from "../utils.js";

//Estructura standard del error
import {CustomError} from "../services/error/customError.service.js";
//Tipos de errores
import {EError} from "../enums/EError.js"; 
import {ErrorServices} from "../services/error/errorInfo.service.js";
import {logger} from "../utils/logger.js"
import {deletedProductEmail} from "../utils/message.js"

export class ProductsController{ 

    //Función para listar productos filtrados ,ordenados y paginados
    static getProducts = async(req,res)=>{
        try {
            const {limit=5,page=1,sort="asc",category,stock} = req.query;
            if(!["asc","desc"].includes(sort)){
                //return res.json({status:"error", message:"ordenamiento no valido, solo puede ser asc o desc"})
                CustomError.createError({
                    name: "Error al obtener productos",
                    cause: ErrorServices.orderError(sort),
                    message: "Ordenamiento no válido, solo puede ser asc o desc",
                    errorCode: EError.INVALID_PARAMS
                });
            };
            const sortValue = sort === "asc" ? 1 : -1;
            const stockValue = stock === 0 ? undefined : parseInt(stock);
            // console.log("limit: ", limit, "page: ", page, "sortValue: ", sortValue, "category: ", category, "stock: ", stock);
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
            logger.info("baseUrl", baseUrl);
            //baseUrl: http://localhost:8080/api/products
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
                totalDocs:result.totalDocs,
                prevPage: result.prevPage,
                nextPage: result.nextPage,
                page:result.page,
                hasPrevPage:result.hasPrevPage,
                hasNextPage:result.hasNextPage,
                prevLink: result.hasPrevPage ? `${baseUrl.replace( `page=${result.page}` , `page=${result.prevPage}` )}` : null,
                nextLink: result.hasNextPage ? `${baseUrl.replace( `page=${result.page}` , `page=${result.nextPage}` )}` : null,
            }
            res.json(response)
        } catch (error) {
            //res.json({status:"error", message:error.message});
            switch (error.code) {
                case EError.ROUTING_ERROR:
                    res.json({status:"error", message:error.message});
                break;
                case EError.DATABASE_ERROR:
                    res.json({status:"error", message:error.message});
                break;
                case EError.AUTH_ERROR:
                    res.json({status:"error", message:error.message});
                break;
                case EError.INVALID_JSON:
                    res.json({status:"error",message:error.message});
                break;
                case EError.INVALID_PARAMS:
                    res.json({status:"error", message: error.message});
                break;
                default:
            break; 
            }
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
                //res.status(400).json({status: "error", data: "el id no es un numero"});
                CustomError.createError({
                    name: "Error al obtener el producto",
                    cause: ErrorServices.productIdError(id),
                    message: "el id no es un numero",
                    errorCode: EError.INVALID_PARAMS
                });
            } 
        }catch(error){
            //res.status(400).json({status: "error", data: error.message});
            switch (error.code) {
                case EError.ROUTING_ERROR:
                    res.json({status:"error", message:error.message});
                break;
                case EError.DATABASE_ERROR:
                    res.json({status:"error", message:error.message});
                break;
                case EError.AUTH_ERROR:
                    res.json({status:"error", message:error.message});
                break;
                case EError.INVALID_JSON:
                    res.json({status:"error",message:error.message});
                break;
                case EError.INVALID_PARAMS:
                    res.json({status:"error", message: error.message});
                break;
                default:
            break;
            }
        } 
    };

    //Función para crear un producto a la base de datos    
    static createProduct = async(req,res)=>{
        try {
            const productInfo = req.body;
            productInfo.owner = req.user._id;
            const productCreated = await ProductsService.createProduct(productInfo);
            res.json({status:"success", data:productCreated});
        } catch (error) {
            //res.json({status:"error", message:error.message});
            switch (error.code) {
                case EError.ROUTING_ERROR:
                    res.json({status:"error", message:error.message});
                break;
                case EError.DATABASE_ERROR:
                    res.json({status:"error", message:error.message});
                break;
                case EError.AUTH_ERROR:
                    res.json({status:"error", message:error.message});
                break;
                case EError.INVALID_JSON:
                    res.json({status:"error",message:error.message});
                break;
                case EError.INVALID_PARAMS:
                    res.json({status:"error", message: error.message});
                break;
                default:
            break;
            }
        }
    };

    //Función para eliminar un producto con notificación para usuarios Premium
    static deleteProduct = async(req,res)=>{
        try {
            const productId = req.params.pid;
            const product = await ProductsService.getProductById(productId);
            const userId = await UsersService.getUserById(product.owner);
            if(userId.role === "premium" || productId.owner === "admin"){
                const result = await ProductsService.deleteProduct(productId);
                if(userId.role  === "premium"){
                    await deletedProductEmail(userId.email);
                }
                res.json({status:"success", message:result});
            }else{
                res.json({status:"error", message:"El usuario no cuenta con los permisos necesarios"});
                CustomError.createError({
                    name: "No tienes permisos",
                    cause: ErrorServices.productIdError(id),
                    message: "No tienes permisos",
                    errorCode: EError.INVALID_PARAMS
                });
            } 
        }catch(error){
            //res.status(400).json({status: "error", data: error.message});
            switch (error.code) {
                case EError.ROUTING_ERROR:
                    res.json({status:"error", message:error.message});
                break;
                case EError.DATABASE_ERROR:
                    res.json({status:"error", message:error.message});
                break;
                case EError.AUTH_ERROR:
                    res.json({status:"error", message:error.message});
                break;
                case EError.INVALID_JSON:
                    res.json({status:"error",message:error.message});
                break;
                case EError.INVALID_PARAMS:
                    res.json({status:"error", message: error.message});
                break;
                default:
            break;
        }}
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
                //res.status(400).json("Error, ID del producto no ha sido encontrado");
                CustomError.createError({
                    name: "Error al actualizar el producto",
                    cause: ErrorServices.productIdError(id),
                    message: "el id no es un numero",
                    errorCode: EError.INVALID_PARAMS
                });
            } 
        }catch(error){
            //res.status(400).json({status: "error", data: error.message});
            switch (error.code) {
                case EError.ROUTING_ERROR:
                    res.json({status:"error", message:error.message});
                break;
                case EError.DATABASE_ERROR:
                    res.json({status:"error", message:error.message});
                break;
                case EError.AUTH_ERROR:
                    res.json({status:"error", message:error.message});
                break;
                case EError.INVALID_JSON:
                    res.json({status:"error",message:error.message});
                break;
                case EError.INVALID_PARAMS:
                    res.json({status:"error", message: error.message});
                break;
                default:
            break;
            }
        }
    };
    
    //Mocking
    static mockingProducts = async(req, res)=>{
        try {
            let Products = []
            for(let i=0;i<101;i++){
                const randomProducts = generateProduct();
                Products.push(randomProducts);
            }
            res.json({status:"success", data:Products});
        } catch (error) {
            //res.json({status:"error", data: error.message});
            switch (error.code) {
                case EError.ROUTING_ERROR:
                    res.json({status:"error", message:error.message});
                break;
                case EError.DATABASE_ERROR:
                    res.json({status:"error", message:error.message});
                break;
                case EError.AUTH_ERROR:
                    res.json({status:"error", message:error.message});
                break;
                case EError.INVALID_JSON:
                    res.json({status:"error",message:error.message});
                break;
                case EError.INVALID_PARAMS:
                    res.json({status:"error", message: error.message});
                break;
                default:
            break;
            }
        }
    }
};