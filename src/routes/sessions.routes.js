import {Router} from "express";
import passport from "passport";
import {SessionsController} from "../controllers/sessions.controller.js"

const router = Router();

router.post("/signup", passport.authenticate("signupStrategy",{
    failureRedirect:"/api/sessions/failed-signup"
}), SessionsController.signupUsers);

router.get("/failed-signup",(req,res)=>{
    res.send("<p>Hubo un error al registrar al usuario <a href='/signup'>Intente de nuevo</a></p>");
});

router.post("/login", passport.authenticate("loginStrategy",{
    failureRedirect:"/api/sessions/failed-login"
}), SessionsController.loginUsers);

router.get("/failed-login",(req,res)=>{
    res.send("<p>Hubo un error al iniciar sesion <a href='/login'>Intente de nuevo</a></p>");
});

router.get("/logout", SessionsController.logoutUser);

router.post("/forgot-password", SessionsController.sendRecovery);

router.post("/reset-password", SessionsController.resetPassword);

export {router as sessionsRouter};