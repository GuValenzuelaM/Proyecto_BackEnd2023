import mongoose from "mongoose";

//objeto users
const usersCollection = "users";

//propiedades del objeto con sus respectivas restricciones
const usersSchema = new mongoose.Schema({
    first_name:{type:String,required:true},
    last_name:{type:String,required:false},
    age:{type:Number,required:false},
    email:{type:String,required:true, unique:true},
    password:{type:String, required:true},
    role:{type: String, required:true, enum:["user", "admin"], default: "user"},
    cart:{type: mongoose.Schema.Types.ObjectId, ref:"carts"}

});

export const userModel = mongoose.model(usersCollection,usersSchema);