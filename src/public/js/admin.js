console.log("vista administrador");

const userRole = (req, res) => {
    const userRole = req.user.role;
    const userId = req.user.id;

    if (userRole === "admin") {
        next();
    } else {
        res.send('No cuentas con los permisos para realizar esta acción <a href="/home">Volver a inicio</a>');
    }
}

const rol = async (req, res) => {
    const userRole = req.user.role;
    const userId = req.user.id;
    
    const resp = await fetch(
        `http://localhost:8080/api/users/update-user/${userId}/${userRole}`,
        {
            method: "put",
        }
    );
    const result = await resp.json();

    const reload = 
    (window.location.href = `http://localhost:8080/api/users/update-user/${userId}/${userRole}`)

}

const deleteUser = async (id)=>{
    const resp = await fetch(
        `http://localhost:8080/api/users/delete-a-user/${id}`,
        {
            method: "delete",
        }
    );
    const result = await resp.json();

    const reload = 
    (window.location.href = `http://localhost:8080/update-users`)
}