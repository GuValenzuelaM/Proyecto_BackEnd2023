import {UsersService} from "../repository/users.services.js";
import {CartsService} from "../repository/cart.services.js";
import {ProductsService} from "../repository/products.services.js";
import {TicketService} from "../repository/ticket.services.js";
import {generateProduct} from "../utils.js";
//Estructura standard del error
import {CustomError} from "../services/error/customError.service.js";
//Tipos de errores
import {EError} from "../enums/EError.js"; 
import {ErrorServices} from "../services/error/errorInfo.service.js";
import {logger} from "../utils/logger.js";

export class ViewsController{
    static renderHome = (req,res)=>{
        res.render("login");
    };

    static renderLogin = (req,res)=>{
        res.render("login");
    };

    static renderSignup = (req,res)=>{
        res.render("signup");
    };

    static renderProfile = (req,res)=>{
        // console.log(req.user);
        res.render("profile",{user:req.user});
    };

    static forgotPass = (req,res)=>{
        res.render("forgotPassword");
    };

    static resetPassword = (req,res)=>{
        const token = req.query.token;
        res.render("reset-password",{token});
    }

    //Función para listar productos filtrados ,ordenados y paginados
    static getProducts = async(req,res)=>{
        try {
            const {limit=5,page=1,sort="asc",category,stock} = req.query;
            if(!["asc","desc"].includes(sort)){
                //return res.json({status:"error", message:"ordenamiento no valido, solo puede ser asc o desc"})
                CustomError.createError({
                    name: "Error al obtener productos",
                    cause: ErrorServices.orderError(sort),
                    message: "ordenamiento no valido, solo puede ser asc o desc",
                    errorCode: EError.INVALID_PARAMS
                });
            };
            const sortValue = sort === "asc" ? 1 : -1;
            const stockValue = stock === 0 ? undefined : parseInt(stock);
            logger.info("limit: ", limit, "page: ", page, "sortValue: ", sortValue, "category: ", category, "stock: ", stock);
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
                totalDocs:result.totalDocs,
                prevPage: result.prevPage,
                nextPage: result.nextPage,
                page:result.page,
                hasPrevPage:result.hasPrevPage,
                hasNextPage:result.hasNextPage,
                prevLink: result.hasPrevPage ? `${baseUrl}?page=${result.prevPage}` : null,
                nextLink: result.hasNextPage ? `${baseUrl}?page=${result.nextPage}` : null,
            }
            res.render("products",response);
            logger.info("response: ", response.payload);
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

    //Entrega carro del usuario activo 
    static getCartById = async(req,res)=>{
        const id = req.params.cid;
        try {
            const cartId = await CartsService.getCartById(id);
            const products = cartId.products;
            res.render("cart", {products});
        } catch (error) {
            //logger.Error(error.message)
            res.status(400).json({status: "error", data: error.message});
        }  
    };
    
    static activeCart = async(req,res)=>{
        res.json(req.user.cart);
    }
    
    //Mocking
    static mockingProducts = async (req, res) => {
        try {
            let Products = [];
            for (let i = 0; i < 101; i++) {
                const randomProduct = generateProduct();
                Products.push(randomProduct);
            }
    
            // Renderizar la plantilla "mocking.hbs" con la variable 'Products'
            res.render("mocking", { Products });
        } catch (error) {
            //res.json({ status: "error", data: error.message });
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
    
    //Logger
    static logger =  async(req,res)=>{
        logger.debug("Nivel Debug");
        logger.http("Nivel Http");
        logger.info("Nivel informativo");
        logger.warning("Nivel Warning");
        logger.error("Nivel Error")
        logger.fatal("Nivel Fatal")
        res.send("Logger Activo");
    }

    static getUserId = async(req,res)=>{
        res.json(req.user._id);
    }

    static getUserRole = async(req,res)=>{
        res.json(req.user.role);
    }

    static getTicket = async(req,res)=>{
        try {
           const email = req.user.email;
           const ticket = await TicketService.getTicket(email);
           res.render("ticket", {ticket})
       } catch (error) {
           logger.error(error.message)
           res.status(400).json({status: "error", data: error.message});
       }
   }
   
}