import {ViewsController} from "../controllers/views.controller.js"
import {TicketsController} from "../controllers/tickets.controller.js"
import {isLoggedIn, isAdmin, checkUserAuthenticatedView, showAuthView, checkRoles,verifyUserCart, addOwnProduct} from "../middlewares/auth.js";
import { Router } from "express";

const router = Router();

//ACTIVAS
router.get("/", ViewsController.renderHome); //ACTIVA
router.get("/login", showAuthView, ViewsController.renderLogin); //ACTIVA
router.get("/signup", showAuthView, ViewsController.renderSignup); //ACTIVA
router.get("/profile", isLoggedIn, ViewsController.renderProfile); //ACTIVA
router.get("/current", checkUserAuthenticatedView, ViewsController.renderProfile); //ACTIVA
router.get("/products", isLoggedIn, ViewsController.getProducts); //ACTIVA
router.get("/userid", isLoggedIn, ViewsController.getUserId); //ACTIVA
router.get("/cart", isLoggedIn, ViewsController.activeCart); //ACTIVA
router.get("/mockingproducts", ViewsController.mockingProducts); //ACTIVA
router.get("/loggerTest", ViewsController.logger); //ACTIVA
router.get("/userrol", isLoggedIn, ViewsController.getUserRole); //ACTIVA
router.get("/totalUsers", isAdmin, ViewsController.totalUsers); //ACTIVA
router.get("/totalProducts", checkRoles(["admin"]), ViewsController.totalProducts); //ACTIVA


//EN PROCESO
//FALTA BOTÓN PURCHASE
router.get("/cart/:cid", isLoggedIn, ViewsController.getCartById);

//FALTA VISTA Y LÓGICA
router.get("/cart/:cid/purchaseCart", verifyUserCart, ViewsController.purchaseCart);

//PENDIENTES
router.get("/failed-signup", showAuthView, ViewsController.failSignup);
router.get("/failed-login", showAuthView, ViewsController.failLogin);
router.get("/forgot-password",ViewsController.forgotPass);
router.get("/reset-password", ViewsController.resetPassword);


//REVISAR
router.get("/logout", showAuthView, ViewsController.renderSignup); //REVISAR
router.get("/ticket", isLoggedIn, ViewsController.getTicket); //REVISAR

export {router as viewsRouter};

//router.get("/admin", isAdmin, ViewsController.renderAdmin);