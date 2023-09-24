import {CartsController} from "../controllers/carts.controller.js"
import {TicketsController} from "../controllers/tickets.controller.js"
import {Router} from "express";
import {verifyUserCart, addOwnProduct} from "../middlewares/auth.js"

const router = Router();

//OK
router.get("/:cid", verifyUserCart, CartsController.getCartById);
router.get("/:cid/purchase", verifyUserCart, CartsController.ticketInformation);


router.put("/:cid/product/:pid", verifyUserCart, CartsController.updateQuantity);


//PENDIENTE
router.put("/:cid", verifyUserCart, CartsController.updateCart);
router.post("/", CartsController.createCart);
router.post("/:cid/product/:pid", verifyUserCart, CartsController.addProductToCart);
router.delete("/:cid", verifyUserCart, CartsController.deleteCart);
router.delete("/:cid/product/:pid", verifyUserCart, CartsController.deleteProductFromCart);



export{router as cartsRouter};
