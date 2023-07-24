import {Router} from "express";
import passport from "passport";
import {createHash, isValidPassword} from "../utils.js";
import {SessionsController} from "../controllers/sessions.controller.js";

const router = Router(); 

//Registro de usuario (exitoso/fallido)
router.post("/signup", passport.authenticate("signupStrategy",{
    failureRedirect:"/api/sessions/failed-signup"
}),SessionsController.signupUsers);

//Registro fallido
router.get("/failed-signup",SessionsController.failSignup);

//Inicio de sesión (exitoso/fallido)
router.post("/login", passport.authenticate("loginStrategy",{
    failureRedirect:"/api/sessions/login-failed"
}) , SessionsController.loginUsers);

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

//Ruta para restaurar la contraseña del usuario
router.post("/forgot", async(req,res)=>{
    try {
        const {email, newPassword} = req.body;
        console.log("newPassword",newPassword)
        const userDB = await userModel.findOne({email:email});
        if(userDB){
            //si el usuario esta registrado, restauramos la contraseña
            userDB.password = createHash(newPassword);
            const userUpdated = await userModel.findByIdAndUpdate(userDB._id, userDB , {new:true});
            res.send('<div>contraseña actualizada, <a href="/login">ir al login</a></div>');
        } else {
            res.send('<div>usuario no registrado, <a href="/signup">registrarse</a> o <a href="/forgot">intente de nuevo</a></div>');
        }
    } catch (error) {
        console.log(error.message)
        res.send('<div>Hubo un error al restaurar la contraseña, <a href="/forgot">intente de nuevo</a></div>')
    }
})

//Ruta cerrar sesion
router.get("/logout",(req,res)=>{
    req.session.destroy(err=>{
        if(err) return res.send('no se pudo cerrar sesion, <a href="/profile">ir al perfil</a>');
        res.redirect("/login")
    });
});

export { router as authRouter};