console.log("vista administrador Update Users");

const ModifyRole = async (id) => {
    const userId = id;
    console.log(userId)
    try{
        const resp = await fetch(
            `http://localhost:8080/api/users/update-role/${userId}`,
            {
                method: "PUT",
            }
        );
        const result = await resp.json();
        const reload = (window.location.href = `http://localhost:8080/api/users/updateUsers/`)

    } catch (error) {
        console.log("Error al modificar el rol del usuario", error.message);
    }
}
/*

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
*/