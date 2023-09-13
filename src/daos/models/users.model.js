import mongoose from "mongoose";

//objeto users
const usersCollection = "users";

//propiedades del objeto con sus respectivas restricciones
const usersSchema = new mongoose.Schema({
    first_name:{type:String,required:true},
    last_name:{type:String,required:true},
    age:{type:Number,required:false},
    email:{type:String,required:true, unique:true},
    password:{type:String, required:true},
    role:{type: String, required:true, enum:["user", "admin", "premium"], default: "user"},
    documents:{type:[{name: {type:String, required:true},reference: {type:String, required:true}}],default:[]},
    last_connection:{type:Date,default:null},
    status:{type:String,required:true, enum:["Incompleto", "Completo", "Pendiente"],default:"Pendiente"},
    avatar:{type:String,default:''},
    cart:{type: mongoose.Schema.Types.ObjectId, ref:"carts"}
});

export const userModel = mongoose.model(usersCollection,usersSchema);