//Controller de Tickets
import {UsersService} from "../repository/users.services.js";
import {CartsService} from "../repository/cart.services.js";
import {ProductsService} from "../repository/products.services.js";
import {TicketService} from "../repository/ticket.services.js";
import {CustomError} from "../services/error/customError.service.js";
import {EError} from "../enums/EError.js"; 
import {ErrorServices} from "../services/error/errorInfo.service.js";
import {v4 as uuidv4} from 'uuid';

export class TicketsController{

    static createTicket = async(req,res)=>{
        try {
            const ticketCreated = await TicketService.createTicket();
            res.json({status:"success", data:ticketCreated});
        } catch (error) {
            res.json({status:"error", message:error.message});
        }
    };

    static getTicket = async(req,res)=>{
        try {
            const userId = req.params.cid;
            const totalTicketsUser = await TicketService.getTicket(userId);
            res.json({status:"success", data:totalTicketsUser});
        } catch (error) {
            res.json({status:"error", message:error.message});
        }
    };

    static stockCheck = async(req,res)=>{
        try {
            const cartId = req.params.cid;
            console.log("cartId:",cartId)
            const cart = await CartsService.getCartById(cartId);
            console.log("cart:",cart)

            //PENDIENTE HACER CHECK POR CADA PRODUCTO DENTRO DEL CARRO

            res.json({status:"success", data:cart});
        } catch (error) {
            res.json({status:"error", message:error.message});
        }
    };
}