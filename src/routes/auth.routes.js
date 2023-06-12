import { Router } from "express";

const router = Router();

//RUTAS DE LAS VISTAS

//ruta para registrar el usuario
router.post("/signup", async(req,res)=>{
    try {
        const userForm = req.body;
        const user = await userModel.findOne({email:userForm.email});
        if(!user){
            const email = userForm.email;
            const password = userForm.email
             if(email == "adminCoder@coder.com" && password =="adminCod3r123"){
                const userCreated = await userModel.create(userForm);
                console.log(userCreated)
                res.send('<div>usuario registrado, <a href="/login">ir al login</a></div>');
                const newUser = await userModel.findOneAndUpdate({email:userCreated.email}, {rol:"admin"})
             }else {
                res.send('<div>usuario registrado, <a href="/login">ir al login</a></div>');
                console.log(userCreated)
             }
        } else {
            res.send('<div>usuario ya registrado, <a href="/signup">intente de nuevo</a></div>');
        }
    } catch (error) {
        res.send('<div>Hubo un error al registrar el usuario, <a href="/signup">intente de nuevo</a></div>')
    }
});

//ruta para loguear el usuario
router.post("/login", async(req,res)=>{
    try {
        const userLoginForm = req.body;
        //buscamos el usuario en la base de datos por el correo
        const userDB = await userModel.findOne({email:userLoginForm.email});
        if(userDB){
            //si existe el usuario, verificamos la contraseña del usuario
            if(userDB.password === userLoginForm.password){
                //una validamos credenciales, creamos la sesion del usuario
                req.session.user={first_name:userDB.first_name, last_name:userDB.last_name, email:userDB.email};
                res.redirect("/products");
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

//ruta cerrar sesion
router.get("/logout",(req,res)=>{
    req.session.destroy(err=>{
        if(err) return res.send('no se pudo cerrar sesion, <a href="/profile">ir al perfil</a>');
        res.redirect("/login")
    });
});

router.get("/github",passport.authenticate("githubSignup"));

router.get("/github-callback",
    passport.authenticate("githubSignup",{
        failureRedirect:"/api/sessions/signup-failed"
    }),
    (req,res)=>{
        res.redirect("/profile");
    }
);


export { router as authRouter};