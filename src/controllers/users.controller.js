import { UsersService } from "../services/users.service.js";

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
                res.send("Rol del usuario modificado");
            }
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
}