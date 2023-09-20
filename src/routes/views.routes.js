import {ViewsController} from "../controllers/views.controller.js"
import {isLoggedIn, isAdmin, checkUserAuthenticatedView, showAuthView} from "../middlewares/auth.js";
import { Router } from "express";

const router = Router();

router.get("/", ViewsController.renderHome);
router.get("/login", showAuthView, ViewsController.renderLogin);
router.get("/failed-login", showAuthView, ViewsController.failLogin);
router.get("/signup", showAuthView, ViewsController.renderSignup);
router.get("/failed-signup", showAuthView, ViewsController.failSignup);
router.get("/logout", showAuthView, ViewsController.renderSignup);
router.get("/profile", isLoggedIn, ViewsController.renderProfile);
router.get("/current", checkUserAuthenticatedView, ViewsController.renderProfile);
router.get("/forgot-password",ViewsController.forgotPass);
router.get("/reset-password", ViewsController.resetPassword);
router.get("/products", isLoggedIn, ViewsController.getProducts);
router.get("/cart", isLoggedIn, ViewsController.activeCart);
router.get("/cart/:cid", isLoggedIn, ViewsController.getCartById);
router.get("/mockingproducts", ViewsController.mockingProducts);
router.get("/loggerTest", ViewsController.logger);
router.get("/userid", isLoggedIn, ViewsController.getUserId);
router.get("/userrol", isLoggedIn, ViewsController.getUserRole);
router.get("/admin", isAdmin, ViewsController.renderAdmin);
router.get("/totalUsers", isAdmin, ViewsController.totalUsers);

export {router as viewsRouter};