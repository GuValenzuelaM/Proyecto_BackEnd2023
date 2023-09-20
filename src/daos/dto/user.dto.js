export class UsersDto{
    constructor(usersDB){
        this.nombre_apellido = `${usersDB.first_name} ${usersDB.last_name}`,
        this.email = usersDB.email,
        this.role = usersDB.role
    }
}