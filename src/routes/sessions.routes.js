import {Router} from "express";
import passport from "passport";
import {SessionsController} from "../controllers/sessions.controller.js"
import {uploadProfile} from "../utils.js";

const router = Router();

router.post("/signup", uploadProfile.single("avatar"), passport.authenticate("signupStrategy",{
    failureRedirect:"/api/sessions/failed-signup"
}), SessionsController.signupUsers);

router.get("/failed-signup",SessionsController.failSignup);

router.post("/login", passport.authenticate("loginStrategy",{
    failureRedirect:"/api/sessions/failed-login"
}), SessionsController.loginUsers);

router.get("/failed-login",SessionsController.failLogin);

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

router.get("/logout", SessionsController.logoutUser);

router.post("/forgot-password", SessionsController.sendRecovery);

router.post("/reset-password", SessionsController.resetPassword);

export {router as sessionsRouter};