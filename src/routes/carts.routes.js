import {CartsController} from "../controllers/carts.controller.js"
import {Router} from "express";

const router = Router();

//Crea una nuevo carrito
router.post("/", CartsController.createCart);

//Elima producto del carrito
router.delete("/:cid", CartsController.deleteCart);

//Muestra los productos que se encuentran en el carrito
router.get("/:cid", CartsController.getCart);

//Agrega productos al carrito
router.post("/:cid/product/:pid",CartsController.addProduct);

//Elima producto del carrito
router.delete("/:cid/product/:pid", CartsController.deleteProduct);

//Actualiza carrito
router.put("/:cid", CartsController.updateCart);

//Actualiza cantidad de un producto
router.put("/:cid/product/:pid", CartsController.updateQuantity);

//Elima producto del carrito
router.post("/:cid/purchase", CartsController.processPurchase)

export{router as cartsRouter};
