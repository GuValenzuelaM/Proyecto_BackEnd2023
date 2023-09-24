import {UsersService} from "../repository/users.services.js";
import {CartsService} from "../repository/cart.services.js";
import {TicketService} from "../repository/ticket.services.js";
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

    //NUEVO
    static userByCardId = async(req,res)=>{
        try{
            const cartId = req.params.cid
            const user = await UsersService.userByCardId(cartId);
            const userId = user._id
            res.send(userId)
        } catch (error) {
            logger.error(error.message)
            res.status(400).json({status:"error", message:error.message});
        }
    }
}

//BORRAR???
    /*
    static activeTicket = async(req,res)=>{
        try {
        const userId1= req.user._id;
        console.log("0 userId :", userId1)
        const userId3= JSON.stringify(req.user._id); //DOBLE COMIILAS
        console.log("1 userId :", userId3)
        
        //JSON.parse(JSON.stringify(ticket));
        const activeTicket = await TicketService.getTicket(userId1);
        console.log("2 activeTicket :", activeTicket)


            //const activeTicket = await TicketService.getTicketByEmail(userId._id.email);
            //console.log("2 activeTicket :", activeTicket)
            
            //REVISAR


            res.render("activeTicket", {activeTicket});
        } catch (error) {
            res.json({status:"error", message:error.message});
        }
    };


*/