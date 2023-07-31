import {CartsController} from "../controllers/carts.controller.js"
import {Router} from "express";
import {verifyUserCart} from "../middlewares/auth.js"

const router = Router();

//Crea una nuevo carrito
router.post("/", CartsController.createCart);

//Elima producto del carrito
router.delete("/:cid", verifyUserCart, CartsController.deleteCart);

//Muestra los productos que se encuentran en el carrito
router.get("/:cid", CartsController.getCartById);

//Agrega productos al carrito
//router.post("/:cid/product/:pid",verifyUserCart, CartsController.addProductToCart);
router.put("/:cid/:pid", verifyUserCart, CartsController.addProductToCart);

//Elima producto del carrito
router.delete("/:cid/:pid", verifyUserCart, CartsController.deleteProductFromCart);

//Actualiza carrito
router.put("/:cid", verifyUserCart, CartsController.updateCart);

//Actualiza cantidad de un producto
router.put("/:cid/product/:pid", verifyUserCart, CartsController.updateQuantity);

//Elima producto del carrito
router.post("/:cid/purchase", verifyUserCart, CartsController.processPurchase)

export{router as cartsRouter};
