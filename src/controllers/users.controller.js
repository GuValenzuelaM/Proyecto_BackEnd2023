import {UsersService} from "../repository/users.services.js";
import {CartsService} from "../repository/cart.services.js";
import {userModel} from "../daos/models/users.model.js";
import {UsersDto} from "../daos/dto/user.dto.js";

export class UsersController{
    static modifyRole = async(req,res)=>{
        try {
            const userId = req.params.uid;
            const user = await UsersService.getUserById(userId);
            if(!user){
                return res.send("El usuario no existe, <a href='/singup'>Registrarse</a>");
            } else{
                const userRole = user.role;
                if(userRole === "user"){
                    user.role = "premium";
                } else if(userRole === "premium"){
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
            res.json({status:"success", data:totalUsers});
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
}


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