import { UsersService } from "../services/users.service.js";
import { generateEmailToken, sendRecoveryEmail } from "../utils/message.js";
import { verifyEmailToken, isValidPassword, createHash } from "../utils.js";

export class SessionsController{

    //Registro de usuario éxitoso
    static signupUsers = (req,res)=>{
        //res.render("login",{message:"Usuario registrado correctamente"});
        res.send("Usuario registrado correctamente");
    };

    //Registro de usuario fallido
    static failSignup = (req,res)=>{
        res.send('<p>Hubo un error al registrar al usuario <a href="/signup">Intente de nuevo</a></p>');
    };

    //Inicio de sesión éxitoso
    static loginUsers = (req,res)=>{
        res.send("login exitoso")
        //res.redirect("/profile");
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
    
    static sendRecovery = async(req,res)=>{
        const {email} = req.body;
        //validar si el correo existe en db
        try {
            const user = await UsersService.getUserByEmail(email);
            //generar el token para este usuario
            //Nota:1hora*60min*60s = 3600seg ;  3min*60s
            const token = generateEmailToken(email,3*60)//token con tiempo de exp de 3min
            //enviar el mensaje con el enlace y el token
            await sendRecoveryEmail(email,token);
            res.send("Se ha enviado un enlace a tu correo");
        } catch (error) {
            res.json({status:"error", message:error.message})
        }
    };

    static resetPassword = async(req,res)=>{
        try {
            const token = req.query.token;
            const {newPassword} = req.body;
            //validamos el token
            const userEmail = verifyEmailToken(token);
            if(!userEmail){
                return res.send("El enlace caduco, <a href='/forgot-password'>genera un nuevo enlace</a>");
            }
            //una vez validado el token, ahora validamos que el usuario exista en db
            const user = await UsersService.getUserByEmail(userEmail);
            //si el usuario existe, validar que la nueva contraseña no sea igual a a la anterior contraseña
            if(isValidPassword(newPassword,user)){
                return res.render("reset-password",{error:"La contraseña no puede ser la misma",token})
            }
            //si las contraseñas no son iguales, actualizamos el usuario con la nueva contraseña
            const newUser = {
                ...user,
                password:createHash(newPassword)
            };
            const userUpdated = await UsersService.updateUser(user._id,newUser);
            console.log(userUpdated);
            res.redirect("/login");
        } catch (error) {
            res.send("No se pudo restablecer la contraseña");
        }
    }
}