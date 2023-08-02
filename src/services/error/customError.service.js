import {logger} from "../../utils/logger.js";

export class CustomError{
    //genera la estructura standard del error
    static createError({name,cause,message,errorCode}){
        const error = new Error(message,{cause});
        error.name=name;
        error.code=errorCode;
        logger.error("error: ", error.name);
        throw error;
    }
}