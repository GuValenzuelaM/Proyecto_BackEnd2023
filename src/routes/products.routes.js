import { ProductsController } from "../controllers/products.controller.js";
import { Router } from "express";
import {checkUserAuthenticatedView, checkRoles, canAddProducts, canEditProducts, isAdmin} from "../middlewares/auth.js";
import {UsersController} from "../controllers/users.controller.js"
const router = Router();

//Obtener productos
router.get("/",ProductsController.getProducts);

//Obtener productos por id
router.get("/:pid", ProductsController.getProductById);

//Agregar productos (Administrador)
router.post("/", checkUserAuthenticatedView, canAddProducts, ProductsController.createProduct);

//REVISAR
//Eliminar productos (Administrador)
router.delete("/:pid", canEditProducts, ProductsController.deleteProduct);

//Modificar productos (Administrador)
router.put("/:pid", canEditProducts, ProductsController.updateProducts);

//Mocking (Administrador)
router.get("/mockingproducts", ProductsController.mockingProducts);

export {router as productsRouter};