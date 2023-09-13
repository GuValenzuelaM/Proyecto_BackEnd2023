import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "./config/config.js";
import { Faker, faker, es} from "@faker-js/faker" //https://fakerjs.dev/api/
import multer from "multer";

export const __dirname = path.dirname(fileURLToPath(import.meta.url));

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

const checkfields = (body)=>{
    const {first_name,email,password} = body;
    if(!first_name || !email || !password){
        return false;
    } else {
        return true;
    }
};

const multerProfilefilter = (req,file,cb)=>{
    const validFields = checkfields(req.body);
    if(!validFields){
        cb(null, false);
    } else {
        cb(null, true);
    }
}

const profileStorage = multer.diskStorage({
    //donde voy a guardar los archivos
    destination: function(req,file,cb){
        cb(null,path.join(__dirname,"/multer/users/images"))
    },
    // con que nombre guardaremos el archivo
    filename:function(req,file,cb){
        cb(null,`${req.body.email}-perfil-${file.originalname}`) //pepe@gmail.com-perfil-avatar.png
    }
});

export const uploadProfile = multer({storage:profileStorage, fileFilter:multerProfilefilter});

//configuración de donde guardar los documentos de los usuarios
const userDocsStorage = multer.diskStorage({
    //donde voy a guardar los archivos
    destination: function(req,file,cb){
        cb(null,path.join(__dirname,"/multer/users/documents"))
    },
    // con que nombre guardaremos el archivo
    filename:function(req,file,cb){
        cb(null,`${req.user.email}-documento-${file.originalname}`)
    }
});
//crear el uploader
export const uploadUserDoc = multer({storage:userDocsStorage});

//configuración de donde guardar las imagenes de los productos
const imgProductStorage = multer.diskStorage({
    //Carpeta destino imagenes de productos
    destination: function(req,file,cb){
        cb(null,path.join(__dirname,"/multer/products/images"))
    },
    //Nombre respaldo imagenes de productos
    filename:function(req,file,cb){
        cb(null,`${req.body.code}-imgProducto-${file.originalname}`)
    }
});
//Uploader
export const uploadImgProduct = multer({storage:imgProductStorage});

