//Controller de carritos

import {CartsService} from "../repository/cart.services.js";
import {ProductsService} from "../repository/products.services.js";
import {TicketService} from "../repository/ticket.services.js";

//Estructura standard del error
import {CustomError} from "../services/error/customError.service.js";
//Tipos de errores
import {EError} from "../enums/EError.js"; 

export class CartsController{
    //Crea un carrito usando CartsService
    static createCart = async(req,res)=>{
        try {
            const cartCreated = await CartsService.createCart();
            res.json({status:"success", data:cartCreated});
        } catch (error) {
            res.json({status:"error", message:error.message});
        }
    };

    //Elimina un carrito usando el ID
    static deleteCart = async (req, res) => {
        try {
            const cartId = req.params.cid;
            const result = await CartsService.deleteCart(cartId);
            res.json({ status: "success", mensaje: "Carrito eliminado" });
        } catch (error) {
            res.status(400).json({ status: "error", mensaje: error.message });
        }
    };
    
    //Función que obtiene carrito según ID
    static getCartById = async (req, res) => {
        try {
            const cartId = req.params.cid;
            const cart = await CartsService.getCartById(cartId);
            res.json({status:"success", data:cart});
        } catch (error) {
            res.json({status:"error", message:error.message});
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
            res.status(400).json({ status: "error", mensaje: error.message });
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
            res.status(400).json({ status: "error", mensaje: error.message });
        }
    };

    //Actualización del carrito según ID
    static updateCart = async (req, res) => {
        try {
            const cartId = req.params.cid;
            const result = await CartsService.updateCart(cartId);
            res.json({ status: "success", mensaje: "Carrito actualizado", data: result });
        } catch (error) {
            res.status(400).json({ status: "error", message: error.message });
        }
    };

    //Actualiza la cantidad del producto
    static updateQuantity = async (req, res) => {
        try {
            const cartId = req.params.cid;
            const productId = req.params.pid;
            const quantity = req.params.quantity;
            const result = await CartsService.updateQuantity(cartId, productId, quantity);
            res.json({ status: "success", mensaje: "Cantidad del producto actualizada" });
        } catch (error) {
            res.status(400).json({ status: "error", mensaje: error.message });
        }
    };
    
    //Proceso de compra para un carrito
    static processPurchase = async (req, res) => {
        try {
          //Busca el carrito de compras según ID
          const cartId = req.params.cid;
          //Obtiene el carrito de compras por su ID
          const cart = await CartsService.getCartById(cartId);
      
          //Verificación del carrito, rectifica que tenga productos
          if (cart.products.length === 0) {
            //Respuesta de error en caso que el carro este vacío
            res.status(400).json({ status: "error", message: "El carrito está vacío." });
            return;
          }
      
          const productsApproved = [];
          const productsRejected = [];
      
          //Recorre los productos del carrito
          for (const productItem of cart.products) {
            const productId = productItem.productId;
            const productQ = productItem.quantity;
      
            //Busca la información del producto según el ID
            const product = await ProductsService.getProductById(productId);
            if (!product) {
              //Agrega el producto rechazado si no esta en la BD
              productsRejected.push(productId);
              continue;
            }
      
            if (product.stock >= productQ) {
              //Actualiza el stock de cada producto
              await ProductsService.updateProductStock(productId, product.stock - productQ);
              //Agrega precio total del producto a todos los aprobados
              productsApproved.push(product.price * productQ);
            } else {
              //Agrega el producto rechazado si el stock es insuficiente
              productsRejected.push(productId);
            }
          }
      
          if (productsApproved.length === 0) {
            //Responde con un error en caso de no procesar la compra de ningún producto
            res.json({ status: "error", message: "No se pudo procesar ningún producto." });
            return;
          }
      
          const today = new Date();
          const totalAmount = productsApproved.reduce((a, b) => a + b, 0);
      
          const ticket = { code: "x", purchaseDatetime: today, amount: totalAmount };
          //Creación de ticket de compra
          const createdTicket = await TicketService.createTicket(ticket);
      
          if (productsRejected.length > 0) {
            //Responde con mensaje de compra exitosa y productos rechazados
            res.json({
              status: "success",
              message: `Compra parcialmente exitosa. Ticket: ${createdTicket}. Algunos productos no pudieron ser procesados.`,
            });
          } else {
            //Respuesta de compra exitosa
            res.json({ status: "success", message: `Compra exitosa. Ticket: ${createdTicket}` });
          }
        } catch (error) {
          //Respuesta de error
          res.status(400).json({ status: "error", message: error.message });
        }
    };
    
}

/*
createCart
deleteCart
getCart
addProduct
deleteProduct
updateCart
updateQuantity
processPurchase
*/
     