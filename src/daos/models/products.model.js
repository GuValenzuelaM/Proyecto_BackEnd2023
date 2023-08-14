import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productsCollection = "products";

const productsSchema = new mongoose.Schema({
    title:{ type: String, required:true},
    price: {type:Number, required:true}, 
    code: {type:String,required:true, unique:true},
    stock: {type:Number, required:true},
    category: {
        type:String,
        required:true,
        enum: ["Ropa","Tecnologia","Deportes"],
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        default: "64d3a1b3e49a194d3e23a4e4"
    }
});
productsSchema.plugin(mongoosePaginate);

export const productsModel = mongoose.model(productsCollection,productsSchema);