import {ViewsController} from "../controllers/views.controller.js"
import {isLoggedIn, isAdmin, checkUserAuthenticatedView, showAuthView} from "../middlewares/auth.js";
import { Router } from "express";
//import {isLoggedIn, isAdmin} from "../middlewares/auth.js"

const router = Router();

router.get("/", ViewsController.renderHome);
router.get("/signup", showAuthView, ViewsController.renderSignup);
router.get("/logout", showAuthView, ViewsController.renderSignup);
router.get("/login", showAuthView, ViewsController.renderLogin);
router.get("/products", isLoggedIn, ViewsController.getProducts);
router.get("/profile", isLoggedIn, ViewsController.renderProfile);
router.get("/current", checkUserAuthenticatedView, ViewsController.renderProfile);
router.get("/forgot-password",ViewsController.forgotPass);
router.get("/reset-password", ViewsController.resetPassword);
router.get("/mockingproducts", ViewsController.mockingProducts);
router.get("/loggerTest", ViewsController.logger);
router.get("/userid", isLoggedIn, ViewsController.getUserId);
router.get("/userrol", isLoggedIn, ViewsController.getUserRole);

router.get("/cart", isLoggedIn, ViewsController.getCartById);
//router.get("/", isLoggedIn, ViewsController.renderHome);
//router.get("/user-cart", isLoggedIn, ViewsController.getCartById);

export {router as viewsRouter};