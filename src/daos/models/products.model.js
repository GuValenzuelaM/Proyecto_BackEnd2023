import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productsCollection = "products";

const productsSchema = new mongoose.Schema({
    title:{ type: String, required:true},
    //description:{ type: String, required:true},
    price: {type:Number, required:true}, 
    code: {type:String,required:true, unique:true},
    stock: {type:Number, required:true},
    thumbnail:{ type: String},
    category: {
        type:String,
        required:true,
        enum: ["Ropa","Tecnologia","Deporte"],
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        default: "650c8f17f20e708b877a9b70" //guvalenzuelam@gmail.com
    }
});
productsSchema.plugin(mongoosePaginate);

export const productsModel = mongoose.model(productsCollection,productsSchema);