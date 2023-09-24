import {Router} from "express";
import passport from "passport";
import {createHash, isValidPassword} from "../utils.js";
import {SessionsController} from "../controllers/sessions.controller.js";
import {UsersController} from "../controllers/users.controller.js"
import {logger} from "../utils/logger.js";
import {isLoggedIn,checkUserAuthenticatedView,checkRoles} from "../middlewares/auth.js";
import {uploadUserDoc,uploadProfile} from "../utils.js";

const router = Router();

//Registro de usuario (exitoso/fallido)
router.post("/signup",uploadProfile.single("avatar"),passport.authenticate("signupStrategy",{
    failureRedirect:"/api/sessions/failed-signup"
}),SessionsController.signupUsers);

//Registro fallido
router.get("/failed-signup",SessionsController.failSignup);

//Inicio de sesión (exitoso/fallido)
router.post("/login", passport.authenticate("loginStrategy",{
    failureRedirect:"/api/sessions/failed-login"
}), SessionsController.loginUsers);

//Inicio de sesión fallido
router.get("/login-failed",SessionsController.failLogin);

//Ruta registro con github
router.get("/github",passport.authenticate("githubSignup"));

//Ruta Autenticación GitHub
router.get("/github-callback",
    passport.authenticate("githubSignup",{
        failureRedirect:"/api/sessions/signup-failed"
    }),
    (req,res)=>{
        res.redirect("/profile");
    }
);

//Ruta cerrar sesion
router.get("/logout",(req,res)=>{
    req.session.destroy(err=>{
        if(err) return res.send('no se pudo cerrar sesion, <a href="/profile">ir al perfil</a>');
        res.redirect("/login")
    });
});

export { router as authRouter};