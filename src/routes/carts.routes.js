import {CartsController} from "../controllers/carts.controller.js"
import {TicketsController} from "../controllers/tickets.controller.js"
import {Router} from "express";
import {verifyUserCart, addOwnProduct} from "../middlewares/auth.js"

const router = Router();

//OK
router.get("/:cid", verifyUserCart, CartsController.getCartById);

router.get("/:cid/purchase", verifyUserCart, CartsController.purchaseCart);

//PENDIENTE
router.post("/", CartsController.createCart);
router.post("/:cid/product/:pid", verifyUserCart, addOwnProduct, CartsController.addProductToCart);
router.put("/:cid", verifyUserCart, addOwnProduct, CartsController.updateCart);
router.put("/:cid/product/:pid", verifyUserCart, addOwnProduct, CartsController.updateQuantity);
router.delete("/:cid", verifyUserCart, CartsController.deleteCart);
router.delete("/:cid/product/:pid", verifyUserCart, CartsController.deleteProductFromCart);

//EN PROCESO
//router.delete("/:cid/purchase", verifyUserCart, TicketsController.deleteProductFromCart);


//REVISIÓN - DESPUÉS BORRAR


export{router as cartsRouter};
