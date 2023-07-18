import { CartsService } from "../repository/cart.services.js";
import { ProductsService } from "../repository/products.services.js";
import { TicketService } from "../repository/ticket.services.js";

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
            res.status(400).json({ status: "error", mensaje: error.message });
        }
    };
    
        static getCart = async (req, res) => {
            try {
                const id = req.params.cid;
                if (id) {
                    const cart = await CartsService.getCartById(id);
                    res.json({ status: "success", data: cart });
                } else {
                    res.status(400).json({ status: "error", data: "Carrito no encontrado" });
                }
            } catch (error) {
                res.status(400).json({ status: "error", data: error.message });
            }
        };
    
        static addProduct = async (req, res) => {
            try {
                const cartId = req.params.cid;
                const productId = req.params.pid;
                const result = await CartsService.addProductToCart(cartId, productId);
                res.json({ status: "success", mensaje: "Producto agregado al carrito" });
            } catch (error) {
                res.status(400).json({ status: "error", mensaje: error.message });
            }
        };
    
        static deleteProduct = async (req, res) => {
            try {
                const cartId = req.params.cid;
                const productId = req.params.pid;
                const result = await CartsService.deleteProducts(cartId, productId);
                res.json({ status: "success", mensaje: "Producto eliminado del carrito" });
            } catch (error) {
                res.status(400).json({ status: "error", mensaje: error.message });
            }
        };
    
        static updateCart = async (req, res) => {
            try {
                const cartId = req.params.cid;
                const result = await CartsService.updateCart(cartId);
                res.json({ status: "success", mensaje: "Carrito actualizado", data: result });
            } catch (error) {
                res.status(400).json({ status: "error", message: error.message });
            }
        };
    
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
        
        static processPurchase = async (req, res) => {
            try {
              // OBTIENE EL ID DEL CARRITO DE COMPRAS
              const cartId = req.params.cid;
              // OBTIENE EL CARRITO DE COMPRAS POR SU ID
              const cart = await CartsService.getCartById(cartId);
          
              // VERIFICA SI EL CARRITO TIENE PRODUCTOS
              if (cart.products.length === 0) {
                // RESPONDE CON UN ERROR SI EL CARRITO ESTÁ VACÍO
                res.status(400).json({ status: "error", message: "El carrito está vacío." });
                return;
              }
          
              const productsApproved = [];
              const productsRejected = [];
          
              // RECORRE LOS PRODUCTOS EN EL CARRITO
              for (const productItem of cart.products) {
                const productId = productItem.productId;
                const productQ = productItem.quantity;
          
                // OBTIENE LA INFORMACIÓN DEL PRODUCTO POR SU ID
                const product = await ProductsService.getProductById(productId);
                if (!product) {
                  // AGREGA EL PRODUCTO RECHAZADO SI NO SE ENCUENTRA EN LA BASE DE DATOS
                  productsRejected.push(productId);
                  continue;
                }
          
                if (product.stock >= productQ) {
                  // ACTUALIZA EL STOCK DEL PRODUCTO
                  await ProductsService.updateProductStock(productId, product.stock - productQ);
                  // AGREGA EL PRECIO TOTAL DEL PRODUCTO A LOS PRODUCTOS APROBADOS
                  productsApproved.push(product.price * productQ);
                } else {
                  // AGREGA EL PRODUCTO RECHAZADO SI EL STOCK ES INSUFICIENTE
                  productsRejected.push(productId);
                }
              }
          
              if (productsApproved.length === 0) {
                // RESPONDE CON UN ERROR SI NO SE PUDO PROCESAR NINGÚN PRODUCTO
                res.json({ status: "error", message: "No se pudo procesar ningún producto." });
                return;
              }
          
              const today = new Date();
              const totalAmount = productsApproved.reduce((a, b) => a + b, 0);
          
              const ticket = { code: "x", purchaseDatetime: today, amount: totalAmount };
              // CREA UN TICKET DE COMPRA
              const createdTicket = await TicketService.createTicket(ticket);
          
              if (productsRejected.length > 0) {
                // RESPONDE CON UN MENSAJE DE COMPRA EXITOSA Y PRODUCTOS RECHAZADOS
                res.json({
                  status: "success",
                  message: `Compra parcialmente exitosa. Ticket: ${createdTicket}. Algunos productos no pudieron ser procesados.`,
                });
              } else {
                // RESPONDE CON UN MENSAJE DE COMPRA EXITOSA
                res.json({ status: "success", message: `Compra exitosa. Ticket: ${createdTicket}` });
              }
            } catch (error) {
              // RESPONDE CON UN ERROR EN CASO DE EXCEPCIÓN
              res.status(400).json({ status: "error", message: error.message });
            }
        };
}
        