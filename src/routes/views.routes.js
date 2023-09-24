import {ViewsController} from "../controllers/views.controller.js"
import {TicketsController} from "../controllers/tickets.controller.js"
import {isLoggedIn, isAdmin, checkUserAuthenticatedView, showAuthView, checkRoles,verifyUserCart, addOwnProduct} from "../middlewares/auth.js";
import { Router } from "express";

const router = Router();

router.get("/", ViewsController.renderHome);
router.get("/login", showAuthView, ViewsController.renderLogin);
router.get("/signup", showAuthView, ViewsController.renderSignup);
router.get("/profile", isLoggedIn, ViewsController.renderProfile);
router.get("/current", checkUserAuthenticatedView, ViewsController.renderProfile);
router.get("/products", isLoggedIn, ViewsController.getProducts);
router.get("/userid", isLoggedIn, ViewsController.getUserId);
router.get("/cart", isLoggedIn, ViewsController.activeCart);
router.get("/mockingproducts", ViewsController.mockingProducts);
router.get("/loggerTest", ViewsController.logger);
router.get("/userrol", isLoggedIn, ViewsController.getUserRole);
router.get("/totalUsers", isAdmin, ViewsController.totalUsers);
router.get("/totalProducts", checkRoles(["admin"]), ViewsController.totalProducts);
router.get("/failed-signup", showAuthView, ViewsController.failSignup);
router.get("/failed-login", showAuthView, ViewsController.failLogin);
router.get("/forgot-password",ViewsController.forgotPass);
router.get("/reset-password", ViewsController.resetPassword);


router.get("/cart/:cid", isLoggedIn, ViewsController.getCartById);
router.get("/logout", showAuthView, ViewsController.renderSignup);
router.get("/ticket", isLoggedIn, ViewsController.getTicket);

export {router as viewsRouter};