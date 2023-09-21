import {Router} from "express";
import passport from "passport";
import {createHash, isValidPassword,uploadUserDoc,uploadProfile} from "../utils.js";
import {UsersController} from "../controllers/users.controller.js";
import {isLoggedIn,checkUserAuthenticatedView,checkRoles,isAdmin} from "../middlewares/auth.js";
import {SessionsController} from "../controllers/sessions.controller.js";
import {logger} from "../utils/logger.js";


const router = Router();

router.put("/premium/:uid", checkUserAuthenticatedView, checkRoles(["admin"]) , UsersController.modifyRole );

//¿BORRAR?
//router.delete("/delete-user", UsersController.deleteUser);

router.post("/:uid/documents", checkUserAuthenticatedView, uploadUserDoc.fields([{name:"identificacion",maxCount:1},{name:"domicilio",maxCount:1}, {name:"estadoDeCuenta",maxCount:1}]) , UsersController.uploadDocuments )

router.get("/total-users", checkRoles(["admin"]) , UsersController.totalUsers);

router.get("/updateUsers", UsersController.updateUsers);

router.put("/update-role/:uid/", isAdmin, UsersController.modifyRole)

router.put("/update-roleAdmin/:uid/", isAdmin, UsersController.modifyRoleAdmin)

router.delete("/delete-user/:uid", isAdmin, UsersController.deleteUser)


//PENDIENTE
//router.get("/inactive-users", UsersController.deleteInactiveUsers);

//BORRAR - PRUEBAS
//router.get("/prueba", checkRoles(["admin"]) , UsersController.prueba);

export {router as usersRouter};