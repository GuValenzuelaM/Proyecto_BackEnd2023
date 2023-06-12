//Este archivo permite ubicar y dirigir a las rutas determinadas
import path from 'path';
import { fileURLToPath } from 'url';
import multer from "multer";

export const __dirname = path.dirname(fileURLToPath(import.meta.url));

//HASH, mantiene la confidencialidad de los datos del usurio
export const createHash = (password)=>{
    return bcrypt.hashSync(password,bcrypt.genSaltSync());
};
export const isValidPassword = (password, user)=>{
    return bcrypt.compareSync(password,user.password);
};