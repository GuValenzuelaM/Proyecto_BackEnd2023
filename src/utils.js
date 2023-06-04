//Este archivo permite ubicar y dirigir a las rutas determinadas
import path from 'path';
import bcrypt from "bcrypt";
import { fileURLToPath } from 'url';
import multer from "multer";

export const __dirname = path.dirname(fileURLToPath(import.meta.url));

//FUNCIÓN PARA CREAR EL HASH
export const createHash = (password)=>{
    return bcrypt.hashSync(password,bcrypt.genSaltSync());
};

//FUNCIÓN COMPARA CONTRASEÑAS
export const isValidPassword = (password, user)=>{
    //password - contraseña del formulario de login
    //user - informacion del usuario de la base de datos
    return bcrypt.compareSync(password,user.password);
}