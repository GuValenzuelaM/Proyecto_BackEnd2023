import {EError} from "../enums/EError.js";
import {logger} from "../utils/logger.js";

export const errorHandler = (error,req,res,next)=>{
    logger.error("Code Error: ", error.code);
    switch (error.code) {
        case EError.ROUTING_ERROR:
            res.json({status:"error",message:error.message});
            break;
        case EError.DATABASE_ERROR:
            res.json({status:"error",message:error.message});
            break;
        case EError.AUTH_ERROR:
            res.json({status:"error",message:error.message});
            break;
        case EError.INVALID_JSON:
            res.json({status:"error",message:error.cause});
            break;
        case EError.INVALID_PARAMS:
            res.json({status:"error",message:error.cause});
            break;
        default:
            break;
    }
}