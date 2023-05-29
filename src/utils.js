//Este archivo permite ubicar y dirigir a las rutas determinadas
import path from 'path';
import { fileURLToPath } from 'url';
import multer from "multer";

export const __dirname = path.dirname(fileURLToPath(import.meta.url));

//-------PENDIENTE---------
/*

//carpeta destino de imagenes subidas
const storage = multer.diskStorage({
    //carpeta destino de archivos
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,"/public/img"))
    },

    //nombre con el cual guardaremos el archivo
    filename:function(req,file,cb){
        cb(null,`${Date.now()}-${file.originalname}}`)
    }
});

//función middleware para subir imagenes en las distintas rutas

export const uploader = multer({storage});
*/
