//Controller de carritos
import {UsersService} from "../repository/users.services.js";
import {CartsService} from "../repository/cart.services.js";
import {ProductsService} from "../repository/products.services.js";
import {TicketService} from "../repository/ticket.services.js";
import {CustomError} from "../services/error/customError.service.js";
import {EError} from "../enums/EError.js"; 
import {ErrorServices} from "../services/error/errorInfo.service.js";
import {v4 as uuidv4} from 'uuid';
import {purchaseProcess} from "../utils/message.js"

export class CartsController{
    static createCart = async(req,res)=>{
        try {
            const cartCreated = await CartsService.createCart();
            res.json({status:"success", data:cartCreated});
        } catch (error) {
            res.json({status:"error", message:error.message});
        }
    };

    static deleteCart = async (req, res) => {
        try {
            const cartId = req.params.cid;
            const result = await CartsService.deleteCart(cartId);
            res.json({ status: "success", mensaje: "Carrito eliminado" });
        } catch (error) {
            //res.status(400).json({ status: "error", mensaje: error.message });
            CustomError.createError({
                name: "Error al actualizar el producto",
                cause: ErrorServices.cartIdError(cartId),
                message: "Id del carrito no valido",
                errorCode: EError.INVALID_PARAMS
            });
        }
    };
        
    //Función que obtiene ID del carrito
    static getCartById = async (req, res) => {
        try {
            const cart = req.params.cid;
            const cartId = await CartsService.getCartById(cart);
            const products = cartId.products;
            //res.render("cart", {products});
            res.render("cart", cartId);
            //res.json({status:"success", data:cartId});
        } catch (error) {
            //res.json({status:"error", message:error.message});
            CustomError.createError({
                name: "Error al actualizar el producto",
                cause: "Error",
                message: "Id del carrito no valido",
                errorCode: EError.INVALID_PARAMS
            });
        }
    };

    //Función que agrega productos al carrito
    static addProductToCart = async (req, res) => {
        try {
            const cartId = req.params.cid;
            const productId = req.params.pid;
            const result = await CartsService.addProductToCart(cartId, productId);
            res.json({ status: "success", mensaje: "Producto agregado al carrito" });
        } catch (error) {
            //res.status(400).json({ status: "error", mensaje: error.message });
            CustomError.createError({
                name: "Error al actualizar el producto",
                cause: ErrorServices.addProductIdError(cartId,productId),
                message: "No se pudo agregar el producto",
                errorCode: EError.INVALID_PARAMS
            });
        }
    };

    //Función que elimina productos del carrito
    static deleteProductFromCart = async (req, res) => {
        try {
            const cartId = req.params.cid;
            const productId = req.params.pid;
            const result = await CartsService.deleteProductFromCart(cartId, productId);
            res.json({ status: "success", mensaje: "Producto eliminado del carrito" });
        } catch (error) {
            //res.status(400).json({ status: "error", mensaje: error.message });
            CustomError.createError({
                name: "Error al actualizar el producto",
                cause: ErrorServices.deleteProductIdError(cartId,productId),
                message: "No se pudo agregar el producto",
                errorCode: EError.INVALID_PARAMS
            });
        }
    };

    //Actualización del carrito según ID
    static updateCart = async (req, res) => {
        try {
            const cartId = req.params.cid;
            const result = await CartsService.updateCart(cartId);
            res.json({ status: "success", mensaje: "Carrito actualizado", data: result });
        } catch (error) {
            //res.status(400).json({ status: "error", message: error.message });
            CustomError.createError({
                name: "Error al actualizar el producto",
                cause: ErrorServices.updateCartIdError(cartId),
                message: "No se pudo agregar el producto",
                errorCode: EError.INVALID_PARAMS
            });
        }
    };

    //Actualiza la cantidad del producto
    static updateQuantity = async (req, res) => {
        try {
            const cartId = req.params.cid;
            const productId = req.params.pid;
            const quantity = req.params.quantity;
            const result = await CartsService.updateQuantity(cartId, productId, quantity);
            res.json({ status: "success", mensaje: "Cantidad del producto actualizada", data: result});
        } catch (error) {
            //res.status(400).json({ status: "error", mensaje: error.message });
            CustomError.createError({
                name: "Error al actualizar la cantidad del producto",
                cause: ErrorServices.updateQuantityError(cartId,productId,quantity),
                message: "No se pudo moficar la cantidad del producto",
                errorCode: EError.INVALID_PARAMS
            });
        }
    };

    static ticketInformation = async(req, res)=>{
        try {
            const cartId = req.params.cid;
            console.log("1 cartId:",cartId)
            if(cartId || cart.products.length>0){
                const cart = await CartsService.getCartById(cartId);
                //console.log("2 cart:",cart)
                let productsWithStock =[];
                let productsWithOutStock =[];
                for(let i=0; i<cart.products.length; i++){
                    let productList = cart.products[i]
                    //console.log("3 productList:",productList)
                    let productIidentifier = cart.products[i].productId._id
                    //console.log("4 productIidentifier:",productIidentifier)
                    console.log("5 Stock:",cart.products[i].productId.stock)
                    console.log("6 Cantidad Compra:",cart.products[i].quantity)
                    let stockCheck = (cart.products[i].productId.stock - cart.products[i].quantity)
                    console.log("7 stockCheck:",stockCheck)
                        if(stockCheck>=0){

                            productsWithStock.push(productList);
                            } else{
                            productsWithOutStock.push(productList);
                        }
                        //console.log("8 productsWithStock:",productsWithStock)
                        //console.log("8.1 productsWithStock:",productsWithStock.length)
                        //console.log("9 productsWithOutStock:",productsWithOutStock)
                        //console.log("9.1 productsWithOutStock:",productsWithOutStock.length)

                    }
                    //console.log("8 productsWithStock:",productsWithStock)
                    //res.json({ status: "success", data: {productsWithStock}});
                    
                    const code = uuidv4();
                    let today = new Date();
                    let amount = productsWithStock.reduce((total, product) =>
                        total + (product.quantity * product.productId.price), 0);
                    //console.log("10 amount:",amount)
                    const user = await UsersService.userByCardId(cartId);
                    //console.log("11 user:",user)
                    const email= user.email
                    //console.log("12 email:",email)
                    const ticket = {code: code, purchase_datetime: today, amount: amount, purchaser: email}
                    //console.log("13 ticket:",ticket)
                    const createTicket  = await TicketService.createTicket(ticket);
                    //console.log("14 createTicket:",createTicket)
                    //const totalInfoTicket ={createTicket,productsWithStock,productsWithOutStock} 
                    //console.log("15 totalInfoTicket:",totalInfoTicket)
                    
                    if(productsWithOutStock.length>0){
                        await purchaseProcess(email);
                    }
                    //res.render("ticket", {totalInfoTicket});
                    res.render("ticket", createTicket);
                } else{
                res.status(400).json({status:"error", message:"el carrito no tiene productos"});
                }
            } catch (error) {
            res.status(400).json({status:"error", message:error.message});
        }
    }
}

/*
    static purchaseCart = async(req, res)=>{
        try {
            const cartId = req.params.cid;
            //console.log("1 cartId:",cartId)
            if(cartId || cart.products.length>0){
                const cart = await CartsService.getCartById(cartId);
                //console.log("2 cart:",cart)
                let productsWithStock =[];
                let productsWithOutStock =[];
                for(let i=0; i<cart.products.length; i++){
                    let productList = cart.products[i]
                    //console.log("3 productList:",productList)
                    let productIidentifier = cart.products[i].productId._id
                    //console.log("4 productIidentifier:",productIidentifier)
                    //console.log("5 Stock:",cart.products[i].productId.stock)
                    //console.log("6 Cantidad Compra:",cart.products[i].quantity)
                    let stockCheck = (cart.products[i].productId.stock - cart.products[i].quantity)
                    //console.log("7 stockCheck:",stockCheck)
                        if(stockCheck>=0){

                            productsWithStock.push(productList);
                            } else{
                            productsWithOutStock.push(productList);
                        }
                        //console.log("8 productsWithStock:",productsWithStock)
                        //console.log("9 productsWithOutStock:",productsWithOutStock)
                    } if (productsWithStock>0){
                        UPDATE
                    } 


                    //console.log("8 productsWithStock:",productsWithStock)
                    
                    
                        await deletedProductEmail(email,productsWithOutStock);
                        
                    
                    res.json({ status: "success", data: {productsWithStock}});

                    //res.render("ticket", {totalInfoTicket});
                } else{
                res.status(400).json({status:"error", message:"el carrito no tiene productos"});
                }
            } catch (error) {
            res.status(400).json({status:"error", message:error.message});
        }
    }    




    static purchaseProcess = async(req,res)=>{
        try {
            const cartId = req.params.cid;
            const cart = await CartsService.getCartById(cartId);
            console.log("0 cartId:",cartId)
            const ticketId = req.params.tid;
            console.log("1 ticketId:",ticketId)
            console.log("2 cart:",cart)
            const user = await UsersService.userByCardId(cartId);
            console.log("3 user:",user)
            const email =user.email
            console.log("4 email:",email)
            const infoTicket = [cartId, ticketId, cart, user, email];
            console.log("5 infoTicket:",infoTicket)

            //ENVIAR CORREO
            purchaseCart


            //UPDATE PRODUCTS - REDUCIR STOCK

            
            res.render("ticket", {infoTicket});
        } catch (error) {
            res.json({status:"error", message:error.message});
        }
    };

/*
    


/*

    static purchaseCart = async(req, res)=>{
        try {
            const cartId = req.params.cid;
            //console.log("1 cartId:",cartId)
            if(!cartId){
                res.json({status:"error", message:Error.message});
            } else{
                const cart = await CartsService.getCartById(cartId);
                //console.log("2 cart:",cart)
                if(cart.products.length<=0){
                    res.json({status:"error", message:Error.message});
                } else{
                    let productsWithStock =[];
                    let productsWithOutStock =[];
                    for(let i=0; i<=cart.products.length; i++){
                        let productList = cart.products[i]
                        console.log("3 productList:",productList)
                        let productIidentifier = cart.products[i].productId._id
                        console.log("4 productIidentifier:",productIidentifier)
                        
                        console.log("5 Stock:",cart.products[i].productId.stock)
                        console.log("6 Cantidad Compra:",cart.products[i].quantity)
                        let stockCheck = (cart.products[i].productId.stock - cart.products[i].quantity)
                        console.log("7 stockCheck:",stockCheck)
                        if(stockCheck>=0){
                            productsWithStock.push(productList);
                            } else{
                            productsWithOutStock.push(productList);
                        }
                        console.log("8 productsWithStock:",productsWithStock)
                        console.log("9 productsWithOutStock:",productsWithOutStock)
                    }
                    console.log("8 productsWithStock:",productsWithStock)
                    //res.render("ticket", {productList});
                    res.render("ticket", {productsWithStock});
                }
            }
        } catch (error) {
            res.status(400).json({status: "error", data: error.message});
        }
    }

*/


/*

    //BORRAR?
    static productsFromCart = async(req,res)=>{
        try {
            const totalProducts = await CartsService.getProducts();
            console.log("totalProducts:",totalProducts)
            res.render("productsFromCart", {totalProducts});
        } catch (error) {
            res.json({status:"error", message:error.message});
        }
    };
*/