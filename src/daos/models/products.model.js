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
    }
});
productsSchema.plugin(mongoosePaginate);

export const productsModel = mongoose.model(productsCollection,productsSchema);