import winston from "winston";
import { __dirname } from "../utils.js";
import path from "path";
import {config} from "../config/config.js";

const customLogger={
    levels: {
        fatal:0,
        error:1,
        warning:2,
        info:3,
        http:4,
        debug:5,
    },
    colors: {
        fatal:'red',
        error:'magenta',
        warning:'yellow',
        info:'blue',
        http:'gray',
        debug:'white',
    }
};

const devLogger = winston.createLogger({
    levels: customLogger.levels,
    transports:[
        new winston.transports.Console({
            level:"debug",
            format: winston.format.combine(
                winston.format.colorize({colors:customLogger.colors}),
                winston.format.simple()
            )
        })
    ]
});

const prodLogger = winston.createLogger({
    levels: customLogger.levels,
    transports:[
        new winston.transports.Console({
            level:"info",
            format: winston.format.combine(
                winston.format.colorize({colors:customLogger.colors}),
                winston.format.simple()
            )
        }),
        new winston.transports.File({filename:path.join(__dirname,"/logs/errors.log"), level:"error"})
    ]
});

let logger;
if(config.server.appEnv === "development"){
    logger = devLogger;
} else {
    logger = prodLogger;
}
export {logger};
