console.log("vista administrador Inactive Users");

function simularClicEnB() {
    var botonB = document.getElementById("B");
    if (botonB) {
        botonB.click(); // Simula un clic en el botón B
    }
}

const InactiveUsers = async (uid)=>{
    const userId = uid;
    console.log(userId)
    try {
        const resp = await fetch(
            `http://localhost:8080/api/users/inactiveUsers/${userId}`,
            {
                method: "DELETE",
            }
        );
        const result = await resp.json();
        const reload = (window.location.href = `http://localhost:8080/api/users/inactiveUsers/`)
        
    } catch (error) {
        console.log("Error al borrar el usuario", error.message);
    }
}
