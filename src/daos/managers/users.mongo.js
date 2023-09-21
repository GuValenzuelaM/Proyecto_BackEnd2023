import { userModel } from "../models/users.model.js"

export class userMongo{
    constructor(){
        this.model=userModel;
    };

    //Buscador de usuario por su correo
    async getUserByEmail(emailUser){
        try {
            const user = await this.model.findOne({email:emailUser});
            if(user){
                return JSON.parse(JSON.stringify(user));
            } else{
                return null;
            }
        } catch (error) {
            throw error;
        }
    };

    // 
    async getUserById(userId){
        try {
            const user = await this.model.findById(userId);
            if(!user){
                return null;
                //throw new Error("El usuario no existe");
            }
            return JSON.parse(JSON.stringify(user));
        } catch (error) {
            throw error;
        }
    };

    //Guardar al usuario en la base de datos
    async saveUser(user){
        try {
            const userCreated = await this.model.create(user);
            return userCreated;
        } catch (error) {
            throw error;
        }
    };

    async updateUser(userId,newInfo){
        try {
            const userUpdated = await this.model.findByIdAndUpdate(userId,newInfo,{new:true});
            if(!userUpdated){
                throw new Error("usuario no encontrado");
            }
            return userUpdated;
        } catch (error) {
            throw error;
        }
    };    
    
    async deleteUser(userId){
        try {
            const result = await this.model.deleteOne({ "_id": userId });
            if (result.deletedCount === 1) {
                return { message: "Usuario eliminado correctamente" };
            } else {
                return { message: "Usuario no encontrado" };
            }
        } catch (error) {
            return { message: `Error al eliminar el usuario: ${error.message}` };
        }
    }

    async totalUsers(){
        try {
            const data = await this.model.find().lean();
            return data
        } catch (error) {
            return { message: `Error al obtener los usuarios: ${error.message}` };
        }
    }
    
    async inactiveUsers(){
        try {
            const inactivity = 2 * 24 * 60 * 60 * 1000 //milisegundos
            const date = new Date(Date.now() - inactivity);
            const inactiveUsers = await userModel.find({
                last_connection: { $lt: date },
            });
            return inactiveUsers;
        } catch (error) {
            return { message: `Error al obtener los usuarios: ${error.message}` };
        }
    }

}