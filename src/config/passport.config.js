import passport from "passport";
import localStrategy from "passport-local";
import githubStrategy from "passport-github2";
import {userModel} from "../daos/models/users.model.js";
import {userMongo} from "../daos/managers/users.mongo.js";
import {CartsMongo} from "../daos/managers/carts.mongo.js"
import { createHash, isValidPassword } from "../utils.js";
import {logger} from "../utils/logger.js";

const usersService = new userMongo();
const cartService = new CartsMongo();

export const initializePassport = ()=>{
    //Estartegia registrar de usuario
    passport.use("signupStrategy",new localStrategy(
        {
            usernameField:"email",
            passReqToCallback:true,
        },
        async(req, username, password, done)=>{
            try {
                console.log("req.file",req.file);
                const userSignupForm = req.body;
                const user = await usersService.getUserByEmail(username);
                    if(user){
                        return done(null,false);
                    }
                        let role = "user";
                        if(username.endsWith("@coder.com")){
                            role="admin";
                        }

                        let file
                        if (req.file !== undefined){
                            file = req.file.filename;
                        } else file = "";

                        const cartUser = await cartService.createCart();
                        const newUser = {
                            first_name:userSignupForm.first_name,
                            last_name: userSignupForm.last_name,
                            age: userSignupForm.age,
                            email: userSignupForm.email,
                            password:createHash(password),
                            cart: cartUser,
                            role,
                            avatar: file
                        };
                        const userCreated = await usersService.saveUser(newUser);
                        return done(null, userCreated);
            }catch (error) {
                return done(error);
            }
        }
    ));

    //Estrategia de login
    passport.use("loginStrategy", new localStrategy(
        {
            usernameField:"email"
        },
        async(username, password, done)=>{
            try {
                //Buscamos el usuario en la base de datos por el correo
                const user = await usersService.getUserByEmail(username);
                //Si el usuario no existe, la autenticación falla
                if(!user){
                    return done(null,false);
                }
                //Verificar la contraseña del usuario
                if(!isValidPassword(password,user)){
                    return done(null,false);
                }
                user.last_connection = new Date()
                await usersService.updateUser(user._id, user)
                return done(null,user);
            } catch (error) {
                return done(error);
            }
        }
    ))

    //Estrategia de registro con github
    passport.use("githubSignup", new githubStrategy(
        {
            clientID:"Iv1.10f4f978ac97f03a",
            clientSecret:"9cf6bb62fbe4a740332d9b843d295855344ae3d3",
            callbackUrl:"http://localhost:8080/api/sessions/github-callback"
        },
        async(accesstoken,refreshtoken,profile,done)=>{
            try {
                logger.debug("profile", profile);
                const user = await userModel.findOne({email:profile.username});
                if(!user){
                    //Tipo de rol por defecto será "user"
                    let role = "user";
                    //Si el correo con el cual se registra termina en "@coder.com" el rol será "admin"
                    if(username.endsWith("@coder.com")){
                        role="admin";
                    }
                    //Si no existe el usuario, lo registramos
                    const cartUser = await cartService.addCart
                    const newUser = {
                        first_name:profile.username,
                        last_name: "",
                        age: null,
                        email: profile.username,
                        password:createHash(profile.id),
                        cart: cartUser,
                        role,
                    };
                    const userCreated = await userModel.create(newUser);
                    return done(null, userCreated);
                } else {
                    //          error, user
                    return done(null,false);
                }
            } catch (error) {
                return done(error);
            }
        }
    ));

    //Función para almacenar el ID del usuario en la sesión
    passport.serializeUser((user,done)=>{
        //Guarda el _id del usuario en la sesión (req.session)
        done(null,user._id);
    });

    //Función que obtiene el usuario desde base de datos utilizando su ID
    passport.deserializeUser(async(id,done)=>{
        //Busca el usuario en la base de datos por su ID
        const userDB = await usersService.getUserById(id);
        return done(null,userDB); //req.user = userDB
    });
}