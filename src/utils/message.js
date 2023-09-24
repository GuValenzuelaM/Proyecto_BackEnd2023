import {config} from "../config/config.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

//funcion que genera el token para el enlace
export const generateEmailToken = (email,expireTime)=>{
    const token = jwt.sign({email}, config.server.secretToken ,{expiresIn:expireTime});
    return token;
};

//transporte de nodemailer para enviar correos con gmail
const transporter = nodemailer.createTransport({
    service:"gmail",
    port:587,
    auth:{
        user:config.gmail.adminEmail,
        pass:config.gmail.adminPass
    },
    secure:false,
    tls:{
        rejectUnauthorized:false
    }
});

//funcion para enviar el correo de recuperacion de contraseña
export const sendRecoveryEmail = async(userEmail,token)=>{
    //generar link con el token y el tiempo de expiracion
    const link = `http://localhost:8080/reset-password?token=${token}`;

    //enviar correo
    await transporter.sendMail({
        //estructura del correo
        from:"Ecommerce Proyecto BackEnd 2023",
        to:userEmail,
        subject:"Restablecer contraseña",
        html:`
            <div>
                <h2>Hola, estas restableciendo tu contraseña</h2>
                <p>Da clic para restablecer tu contraseña</p>
                <a href="${link}">
                    <button>Restablecer mi contraseña</button>
                </a>
            </div>
        `
    })
}

export const inactiveUsersEmail = async(userEmail)=>{
    await transporter.sendMail({
        from:"Ecommerce Proyecto BackEnd 2023",
        to:userEmail,
        subject:"Eliminación de cuenta por inactividad",
        html:`
            <div>
                <h2>Hola!</h2>
                <p>Por tu inactividad y para mantener tu seguridad se ha eliminado la cuenta</p>
            </div>
        `
    })
}

export const deletedProductEmail = async(userEmail)=>{
    await transporter.sendMail({
        from:"Ecommerce Proyecto BackEnd 2023",
        to: userEmail,
        subject:"Notificación de eliminación de producto",
        html:`
            <div>
            <h2>Hola!</h2>
            <p>Se ha eliminado un producto de tu autoria</p>
            </div>
        `
    })
}

export const purchaseProcess = async(userEmail)=>{
    await transporter.sendMail({
        from:"Ecommerce Proyecto BackEnd 2023",
        to: userEmail,
        subject:"Compra",
        html:`
            <div>
            <h2>Hola!</h2>
            <p>No tenemos stock de todos los productos/p>
            </div>
        `
    })
}