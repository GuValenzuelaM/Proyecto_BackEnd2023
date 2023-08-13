import { ProductsController } from "../controllers/products.controller.js";
import { Router } from "express";
import {checkUserAuthenticatedView,checkRoles} from "../middlewares/auth.js";
import {UsersController} from "../controllers/users.controller.js"

const router = Router();

//Obtener productos
router.get("/", ProductsController.getProducts);

//Obtener productos por id
router.get("/:pid", ProductsController.getProductById);

//Agregar productos (Administrador)
router.post("/", checkUserAuthenticatedView, checkRoles(["admin","premium"]), ProductsController.createProduct);

//Eliminar productos (Administrador)
router.delete("/:pid", ProductsController.deleteProducts);

//Modificar productos (Administrador)
router.put("/:pid", ProductsController.updateProducts);

//Mocking (Administrador)
router.get("/mockingproducts", ProductsController.mockingProducts);

export {router as productsRouter};