import {UsersService} from "../repository/users.services.js";
import {CartsService} from "../repository/cart.services.js";
import {userModel} from "../daos/models/users.model.js";
import {UsersDto} from "../daos/dto/user.dto.js";
import {inactiveUsersEmail} from "../utils/message.js";
import {logger} from "../utils/logger.js";
import {stringify} from "uuid";

export class UsersController{
    static modifyRole = async(req,res)=>{
        try {
            const userId = req.params.uid;
            const user = await UsersService.getUserById(userId);
            if(!user){
                return res.send("El usuario no existe, <a href='/singup'>Registrarse</a>");
            } else{
                const userRole = user.role;
                if(userRole === "user" || userRole === "admin"){
                    user.role = "premium";
                } else if(userRole === "premium" || userRole === "admin"){
                    user.role = "user";
                    } else{
                    res.send("No es posible cambiar el role del usuario")
                    };
                const result = await UsersService.updateUser(userId,user);
                //res.send("Rol del usuario modificado");
                res.json(result)
            }
        } catch (error) {
            res.send(error.message);
        }
    }

    static modifyRoleAdmin = async(req,res)=>{
        try {
            const userId = req.params.uid;
            const user = await UsersService.getUserById(userId);
            if(!user){
                return res.send("El usuario no existe, <a href='/singup'>Registrarse</a>");
            } else{
                const userRole = user.role;
                if(userRole === "user" || userRole === "premium"){
                    user.role = "admin";
                } else{
                    res.send("No es posible cambiar el role del usuario")
                };
                const result = await UsersService.updateUser(userId,user);
                res.json(result)
            }
        } catch (error) {
            res.send(error.message);
        }
    }

    static uploadDocuments = async(req,res)=>{
        try {
            const userId = req.params.uid;
            const user = await UsersService.getUserById(userId);
            if(!user){
                return res.json({status:"error", message:"El usuario no existe"});
            }
            // console.log("req.files", req.files);
            const identificacion = req.files["identificacion"][0] || null;
            const domicilio = req.files["domicilio"]?.[0] || null;
            const estadoDeCuenta = req.files["estadoDeCuenta"][0] || null;
            const docs = [];
            if(identificacion){
                docs.push({name:"identificacion", reference:identificacion.filename})
            }
            if(domicilio){
                docs.push({name:"domicilio", reference:domicilio.filename})
            }
            if(estadoDeCuenta){
                docs.push({name:"estadoDeCuenta", reference:estadoDeCuenta.filename})
            }
            console.log(docs)
            user.documents = docs;
            if(user.documents.length===3){
                user.status = "Completo";
            } else {
                user.status = "Incompleto";
            }
            await UsersService.updateUser(user._id,user);
            res.json({status:"success", message:"solicitud procesada"});
        } catch (error) {
            res.send(error.message);
        }
    }

    static deleteUser = async(req,res)=>{
        try{ 
            const userId = req.params.uid
            const user = await UsersService.deleteUser(userId);
            res.send(user)
        } catch (error) {
            logger.error(error.message)
            res.status(400).json({status:"error", message:error.message});
        }
    }

    static totalUsers = async(req,res)=>{
        try {
            const users = await UsersService.totalUsers();
            const totalUsers = users.map(user => new UsersDto(user));
            //res.json({status:"success", data:totalUsers});
            res.render("totalUsers", {totalUsers});
        } catch (error) {
            res.json({status:"error", message:error.message});
        }
    };

    static updateUsers =async(req,res)=>{
        try{
            const Users = await UsersService.totalUsers();
            res.render("updateUsers", {Users});
        }catch (error) {
            logger.error(error.message)
            res.status(400).json({status: "error", data: error.message});
        }
    }

    static inactiveUsers =async(req,res)=>{
        try{
            const inactiveUsers = await UsersService.inactiveUsers();
            const totalInactiveUsers = inactiveUsers.map(user => new UsersDto(user));
            console.log("inactiveUsers",totalInactiveUsers)
            res.render("inactiveUsers", {totalInactiveUsers});
        }catch (error) {
            logger.error(error.message)
            res.status(400).json({status: "error", data: error.message});
        }
    }

    static deleteInactiveUsers =async(req,res)=>{
        try{
            const totalInactiveUsers = await UsersService.inactiveUsers();
            if(totalInactiveUsers.length <= 0){
                return res.json(`No se ha eliminado ningun usuario por inactividad`);
            }
            for(let i = 0; i < totalInactiveUsers.length; i++ ){
                const user = totalInactiveUsers[i];
                const inactiveUser = UsersService.deleteUser(user.id);
                await inactiveUsersEmail(user.email);    
            }
            res.json({status:"success", message:"Correo enviado por inactividad"});
        }catch (error) {
            logger.error(error.message)
            res.status(400).json({status: "error", data: error.message});
        }
    }

}

/*

    static deleteUsers = async(req,res)=>{
        try {
            const users = await UsersService.getUsers();

            let deleteUsers = [];
            for(let i = 0; i < users.length; i++ ){
                const user = users[i];

                const last_connection = user.last_connection
                const today = new Date()

                function sumarDias(fecha){
                    fecha.setDate(fecha.getDate() + 2);
                    return fecha;
                  }
                const connection = sumarDias(last_connection);

                if(connection < today){
                    deleteUsers.push(user)
                }
            }
            console.log(deleteUsers)

            if(deleteUsers.length <= 0){
                return res.json(`No se ha eliminado ningun usuario por inactividad`);
            }
            for(let i = 0; i < deleteUsers.length; i++ ){
                const user = deleteUsers[i];
                const id = JSON.stringify(user._id).replace('"', '').replace('"', '')

                const cartId = JSON.stringify(user.cart).replace('"', '').replace('"', '')
                const deletedcart = CartsService.deleteCart(cartId)
                const deleted = UsersService.deleteUserId(id);
                console.log(deleted, deletedcart)
                await sendInactivityEmail(user.email);    
            }
            res.json(`Se ha enviado un enlace a los correos para informarles sobre su inactividad.`)
            
        } catch (error) {
            logger.error(error.message)
            res.status(400).json({status:"error", message:error.message});
        }
    }

*/






















/* RESPALDO

    static deleteUserRespaldo = async(req,res)=>{
        try{ 
            const userId = req.params.uid
            const fullUser = await UsersService.getUserById(userId);
            //const cartId = JSON.stringify(fullUser.cart).replace('"', '').replace('"', '')
            if (!fullUser) {
                return res.status(404).json({ status: "error", message: "Usuario no encontrado" });
            }
            //console.log("user:",fullUser);
            console.log("userId:",userId);
            //console.log("cartId:",cartId);
            //console.log("cartId:",fullUser.cart);
            //const cart = await CartsService.deleteCartId(cartId);
            const user = await UsersService.deleteUser(userId);
            res.send(userId)
        } catch (error) {
            logger.error(error.message)
            res.status(400).json({status:"error", message:error.message});
        }
    }
*/


/*
static prueba = async(req,res)=>{
    try {
        const users = await UsersService.totalUsers();
        
        let deleteUsers = [];
        for(let i = 0; i < users.length; i++ ){
            const user = users[i];

            const last_connection = user.last_connection
            const today = new Date()

            function sumarDias(fecha){
                fecha.setDate(fecha.getDate() + 2);
                return fecha;
              }
            const connection = sumarDias(last_connection);

            if(connection < today){
                deleteUsers.push(user)
            }
        }
        console.log(deleteUsers)
        res.json({status:"success", data:deleteUsers});
        
    } catch (error) {
        res.json({status:"error", message:error.message});
    }
};

static deleteInactiveUsers = async(req, res)=>{
    try {
        inactiveUsers = await UsersService.totalUsers();
        
        if(inactiveUsers.length === 0){
            return res.json(`No se ha eliminado ningun usuario por inactividad`);
        } else{
            for(let i = 0; i < inactiveUsers.length; i++){

                const user = inactiveUsers[i];
                console.log("user:",user)
            //COMENTARIOS INICIO
                const userId = JSON.stringify(user.id)
                const cartId = JSON.stringify(user.cart)
                const deleted = UsersService.deleteUserId(userId);
                const deletedcart = CartsService.deleteCart(cartId)
                console.log(deleted, deletedcart)
                await inactiveUsersEmail(user.email);
            //COMENTARIOS FINAL
            }
        }
        return {message: `Se informaron a ${inactiveUsers.length} usuarios por su inactividad`,inactiveUsers: inactiveUsers};
    }catch (error) {
        res.status(400).json({status:"error", message:error.message});
    }
}
*/