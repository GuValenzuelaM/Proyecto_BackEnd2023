export class SessionsController{

    //Registro de usuario éxitoso
    static signupUsers = (req,res)=>{
        res.send('<div>usuario registrado correctamente, <a href="/login">ir al login</a></div>');
    }

    //Registro de usuario fallido
    static failSignup = (req,res)=>{
        res.send('<p>Hubo un error al registrar al usuario <a href="/signup">Intente de nuevo</a></p>');
    };

    //Inicio de sesión éxitoso
    static loginUsers = (req,res)=>{
        res.redirect("/profile");
    };

    //Inicio de sesión fallido
    static failLogin = (req,res)=>{
        res.send('<div>usuario registrado correctamente, <a href="/singup">ir al login</a></div>');
        //res.send('<div>Hubo un error al registrar el usuario, <a href="/singup">intente de nuevo</a></div>');
    }
    
    //Cerrar sesión de usuario
    static logoutUser = (req,res)=>{
        req.session.destroy((err)=>{
            if(err) return res.send('<p>No fue posible cerrar sesion <a>intente de nuevo</a></p>');
            res.redirect("/");
        });
    };

    //Inicio Sesión GitHub
    static loginGitHub = (req,res)=>{
        res.redirect("/profile");
    }
    
}

/*
signupUsers
failedSignup
loginUsers
failLogin
logoutUser
*/