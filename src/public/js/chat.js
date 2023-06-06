
const socketClient = io();

//VARIABLES DE USUARIO
const chatEmail = document.getElementById("chatEmail");
const chatInput = document.getElementById("chatInput");

//BOTÓN DE ENVIO DE MENSAJE
const btn_sendMessage = document.getElementById("btn_sendMessage");

//VARIABLE MUESTRA MENSAJES
const getMessages = document.getElementById("getMessages");

//POSTERIOR AL CLIC SE EMITE EL MENSAJE AL SERVIDOR Y DEJA LOS IMPUT DEL CHAT VACIOS
btn_sendMessage.addEventListener("click", ()=>{

    socketClient.emit("message", {
        user: chatEmail.value,
        message: chatInput.value
    });
    chatInput.value = "";
});

//MUESTRA LOS MENSAJES HISTORICOS DEL SERVIDOR GUARDADOLOS EN UN ARCHIVO JSON
socketClient.on("MessageHistory", (data)=>{
    console.log(data);

    getMessages.innerHTML = "";
    data.forEach(element => {
        const parrafo = document.createElement("p");
        parrafo.innerHTML = `${JSON.stringify(element)}`;
        getMessages.appendChild((parrafo));
    });
});
