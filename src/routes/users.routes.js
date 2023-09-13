import {Router} from "express";
import passport from "passport";
import {createHash, isValidPassword,uploadUserDoc,uploadProfile} from "../utils.js";
import {UsersController} from "../controllers/users.controller.js";
import {isLoggedIn,checkUserAuthenticatedView,checkRoles} from "../middlewares/auth.js";
import {SessionsController} from "../controllers/sessions.controller.js";
import {logger} from "../utils/logger.js";

const router = Router();

router.put("/premium/:uid", checkUserAuthenticatedView, checkRoles(["admin"]) , UsersController.modifyRole );

router.delete("/delete-user", UsersController.deleteUser);

router.post("/:uid/documents", checkUserAuthenticatedView, uploadUserDoc.fields([{name:"identificacion",maxCount:1},{name:"domicilio",maxCount:1}, {name:"estadoDeCuenta",maxCount:1}]) , UsersController.uploadDocuments )

export {router as usersRouter};

/*
//Ruta para restaurar la contraseña del usuario
router.post("/forgot", async(req,res)=>{
    try {
        const {email, newPassword} = req.body;
        logger.debug("newPassword",newPassword)
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
        logger.error(error.message)
        res.send('<div>Hubo un error al restaurar la contraseña, <a href="/forgot">intente de nuevo</a></div>')
    }
})
*/

