console.log("soy el archivo javascript para la página home");


socketClient.on("messageServer",(data)=>{
    console.log(data);
});