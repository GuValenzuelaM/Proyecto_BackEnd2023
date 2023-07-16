//BORRAR

import { Router } from "express";
import passport from "passport";
import {userModel} from "../daos/models/users.model.js";
import { createHash, isValidPassword } from "../utils.js";

const router = Router();

//RUTAS DE LAS VISTAS

//Registro de usuario
router.post("/signup", passport.authenticate("signupStrategy",{
    failureRedirect:"/api/sessions/failed-signup"
}), (req,res)=>{
    res.render("login",{message:"Registro correcto de usuario"});
});

router.get("/failed-signup",(req,res)=>{
    res.send("<p>Hubo un error al registrar al usuario <a href='/signup'>Intenta nuevamente</a></p>");
});




//ruta para loguear el usuario
router.post("/login", passport.authenticate("loginStrategy",{
    failureRedirect:"/api/sessions/login-failed"
}) , (req,res)=>{
    //proceso exitoso de login
    res.redirect("/profile");
});

router.get("/login-failed",(req,res)=>{
    res.send('<div>Hubo un error al loguear el usuario, <a href="/login">intente de nuevo</a></div>')
});

//ruta para registro con github
router.get("/github",passport.authenticate("githubSignup"));

router.get("/github-callback",
    passport.authenticate("githubSignup",{
        failureRedirect:"/api/sessions/signup-failed"
    }),
    (req,res)=>{
        res.redirect("/profile");
    }
);

//ruta para restaurar la contraseña del usuario
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

//ruta cerrar sesion
router.get("/logout",(req,res)=>{
    req.session.destroy(err=>{
        if(err) return res.send('no se pudo cerrar sesion, <a href="/profile">ir al perfil</a>');
        res.redirect("/login")
    });
});

export { router as authRouter};





/* AGREGAR VALIDACIONES A RUTA PREVIA

router.post("/signup", async(req,res)=>{
    try {
        const userForm = req.body;
        const user = await userModel.findOne({email:userForm.email});
        if(!user){
            const newUser = {
                first_name:userForm.first_name,
                last_name: userForm.last_name,
                age: userForm.age,
                email: userForm.email,
                password:createHash(userForm.password), //hjags876123jhags8
            }
            //const email = userForm.email;
            //const password = createHash(userForm.password);
            const userCreated = await userModel.create(newUser);
            res.send('<div>usuario registrado, <a href="/login">ir al login</a></div>');
            /* 
            if(email == "adminCoder@coder.com" && password =="adminCod3r123"){
                const newUser = await userModel.findOneAndUpdate({email:userCreated.email}, {rol:"admin"})
                console.log(newUser)
                res.send('<div>usuario registrado, <a href="/login">ir al login</a></div>');
             }else {
                console.log(userCreated)
                res.send('<div>usuario registrado, <a href="/login">ir al login</a></div>');
             }
             */
            /*
        } else {
            res.send('<div>usuario ya registrado, <a href="/signup">intente de nuevo</a></div>');
        }
    } catch (error) {
        res.send('<div>Hubo un error al registrar el usuario, <a href="/signup">intente de nuevo</a></div>')
    }
});

*/


/*
//ruta para loguear el usuario
router.post("/login", async(req,res)=>{
    try {
        const userLoginForm = req.body;
        //buscamos el usuario en la base de datos por el correo
        const userDB = await userModel.findOne({email:userLoginForm.email});
        if(userDB){
            //si existe el usuario, verificamos la contraseña del usuario
            if(isValidPassword(userLoginForm.password,userDB)){
                //una validamos credenciales, creamos la sesion del usuario
                req.session.user={first_name:userDB.first_name, last_name:userDB.last_name, email:userDB.email};
                res.redirect("/profile");
            } else {
                res.send('<div>credenciales invalidas, <a href="/login">intente de nuevo</ahref=></div>');
            }
        } else {
            //si no esta registrado
            res.send('<div>usuario no registrado, <a href="/signup">registrarse</a> o <a href="/login">intente de nuevo</ahref=></div>');
        }
    } catch (error) {
        res.send('<div>Hubo un error al loguear el usuario, <a href="/login">intente de nuevo</a></div>')
    }
});
*/