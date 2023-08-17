import {__dirname} from "../utils.js";
import swaggerJsDoc from "swagger-jsdoc"; 
import path from "path";

const swaggerOptions = {
    definition:{
        openapi:"3.0.1",
        info:{
            title:"Documentacion api de e-commerce",
            version:"1.0.0",
            description:"Definicion de endpoints API Proyecto Backend E-commerce"
        }
    },
    apis:[`${path.join(__dirname,"./docs/**/*.yaml")}`],
};

export const swaggerSpecs = swaggerJsDoc(swaggerOptions);

