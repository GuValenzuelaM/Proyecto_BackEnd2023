import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from "bcrypt";
export const __dirname = path.dirname(fileURLToPath(import.meta.url));
import jwt from "jsonwebtoken";
import { config } from "./config/config.js";
import { Faker, faker, es} from "@faker-js/faker" //https://fakerjs.dev/api/

//import multer from "multer";

//HASH, mantiene la confidencialidad de los datos del usurio
export const createHash = (password)=>{
    return bcrypt.hashSync(password,bcrypt.genSaltSync());
};

//COMPARESYNC, validador de contraseña del formulario y contraseña encriptada (TRUE/FALSE)
export const isValidPassword = (password, user)=>{
    return bcrypt.compareSync(password,user.password);
};

//Generador de productos
const customFaker = new Faker({
    locale:[es]
});
const {commerce, image, string, datatype} = customFaker;

export const generateProduct = ()=>{
    return {
        title:commerce.product(),
        description:commerce.productAdjective(),
        price:commerce.price({ min: 10, max: 999 }),
        code:string.alphanumeric(10),
        status:datatype.boolean(0.5),
        thumbnail:image.urlPicsumPhotos(),
        stock:parseInt(string.numeric(2)),
        category:commerce.department()
    }
};

export const verifyEmailToken = (token)=>{
    try {
        const info = jwt.verify(token,config.server.secretToken);
        return info.email;
    } catch (error) {
        return null;
    }
};