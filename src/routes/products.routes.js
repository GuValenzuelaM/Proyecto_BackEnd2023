import { ProductsController } from "../controllers/products.controller.js";
import { Router } from "express";

const router = Router();

//Obtener productos
router.get("/", ProductsController.getProducts);

//Obtener productos por id
router.get("/:pid", ProductsController.getProductById);

//Agregar productos (Administrador)
router.post("/", ProductsController.createProduct);

//Eliminar productos (Administrador)
router.delete("/:pid", ProductsController.deleteProducts);

//Modificar productos (Administrador)
router.put("/:pid", ProductsController.updateProducts);

//Mocking (Administrador)
router.get("/mockingproducts", ProductsController.mockingProducts);

export {router as productsRouter};