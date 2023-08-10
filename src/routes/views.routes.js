import {ViewsController} from "../controllers/views.controller.js"
import {isLoggedIn, isAdmin} from "../middlewares/auth.js"
import { Router } from "express";

const router = Router();

//Inicio
router.get("/", ViewsController.renderHome);
//router.get("/", isLoggedIn, ViewsController.renderHome);

//Lista de productos
router.get("/products", isLoggedIn, ViewsController.getProducts);

//Perfil del usuario
router.get("/profile", isLoggedIn, ViewsController.renderProfile);

//Carrito del usuario activo
//router.get("/user-cart", isLoggedIn, ViewsController.getCartById);

//PRUEBA
router.get("/cart", isLoggedIn, ViewsController.getCartById);


//Registro
router.get("/signup", ViewsController.renderSignup);

//Inicio de Sesión
router.get("/login", ViewsController.renderLogin);

//Mocking
router.get("/mockingproducts", ViewsController.mockingProducts);

//Logger
router.get("/loggerTest", ViewsController.logger);

export {router as viewsRouter};


/*
router.get("/forgot", (req,res)=>{
    res.render("restaurar");
});
*/  
