export class UsersDto{
    constructor(usersDB){
        this.nombre_apellido = `${usersDB.first_name} ${usersDB.last_name}`,
        this.id = usersDB.id,
        this.email = usersDB.email,
        this.role = usersDB.role
        this.last_connection = usersDB.last_connection
    }
}