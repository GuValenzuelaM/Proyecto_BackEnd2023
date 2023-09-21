import {usersDao} from "../daos/factory.js";

export class UsersService{
    static async getUserByEmail(email){
        return usersDao.getUserByEmail(email);
    };

    static async getUserById(userId){
        return usersDao.getUserById(userId);
    };

    static async saveUser(user){
        return usersDao.saveUser(user);
    };

    static async updateUser(userId,newInfo){
        return usersDao.updateUser(userId,newInfo); 
    };
    
    static async totalUsers(userId){
        return usersDao.totalUsers(userId);
    }
    
    static async deleteUser(userId){
        return usersDao.deleteUser(userId);
    }
}