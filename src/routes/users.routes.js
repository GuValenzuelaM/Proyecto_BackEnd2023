import {Router} from "express";
import passport from "passport";
import {createHash, isValidPassword,uploadUserDoc,uploadProfile} from "../utils.js";
import {UsersController} from "../controllers/users.controller.js";
import {isLoggedIn,checkUserAuthenticatedView,checkRoles,isAdmin} from "../middlewares/auth.js";
import {SessionsController} from "../controllers/sessions.controller.js";
import {logger} from "../utils/logger.js";


const router = Router();

//OK
router.delete("/delete-user/:uid", UsersController.deleteUser)
//router.delete("/delete-user", UsersController.deleteUser);

router.put("/premium/:uid", checkUserAuthenticatedView, checkRoles(["admin"]) , UsersController.modifyRole );
router.post("/:uid/documents", checkUserAuthenticatedView, uploadUserDoc.fields([{name:"identificacion",maxCount:1},{name:"domicilio",maxCount:1}, {name:"estadoDeCuenta",maxCount:1}]) , UsersController.uploadDocuments )
router.get("/total-users", checkRoles(["admin"]) , UsersController.totalUsers);
router.get("/updateUsers", checkRoles(["admin"]), UsersController.updateUsers);
router.put("/update-role/:uid/", isAdmin, UsersController.modifyRole)
router.put("/update-roleAdmin/:uid/", isAdmin, UsersController.modifyRoleAdmin)

router.get("/inactiveUsers", isAdmin, UsersController.inactiveUsers)
router.delete("/inactiveUsers/:uid", isAdmin, UsersController.deleteInactiveUsers)

export {router as usersRouter};