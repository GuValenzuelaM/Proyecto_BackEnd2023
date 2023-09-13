import {CartsController} from "../controllers/carts.controller.js"
import {Router} from "express";
import {verifyUserCart, addOwnProduct} from "../middlewares/auth.js"

const router = Router();

//Crea una nuevo carrito
router.post("/", CartsController.createCart);
//Agrega productos al carrito
router.post("/:cid/:pid", verifyUserCart, addOwnProduct, CartsController.addProductToCart);
//Elima producto del carrito
router.post("/:cid/purchase", verifyUserCart, CartsController.processPurchase)

//Muestra los productos que se encuentran en el carrito
router.get("/:cid", CartsController.getCartById);

//Actualiza carrito
router.put("/:cid", verifyUserCart, addOwnProduct, CartsController.updateCart);
//Actualiza cantidad de un producto
router.put("/:cid/:pid", verifyUserCart, addOwnProduct, CartsController.updateQuantity);

//Elima producto del carrito
router.delete("/:cid", verifyUserCart, CartsController.deleteCart);
//Elima producto del carrito
router.delete("/:cid/:pid", verifyUserCart, CartsController.deleteProductFromCart);

export{router as cartsRouter};
