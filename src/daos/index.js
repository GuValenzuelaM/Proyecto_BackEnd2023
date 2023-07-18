import {ProductsMongo} from "./managers/products.mongo.js";
import {userMongo} from "./managers/users.mongo.js";
import { connectDB } from "../config/dbConnection.js";

const productDao = new ProductsMongo();
const usersDao = new userMongo();

export{productDao, usersDao};
