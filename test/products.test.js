import chai from "chai"
import mongoose from "mongoose"
import {ProductsMongo} from "../src/daos/managers/products.mongo.js"
import {productsModel} from "../src/daos/models/products.model.js"

const expect = chai.expect

describe("Testing carts DAO", ()=>{
    before(async function(){
        await mongoose.connect("mongodb+srv://guvalenzuelam:Coder2023@coderhouse.zqpfl7k.mongodb.net/test?retryWrites=true&w=majority");
        this.productsMongo = new ProductsMongo();
    });
    beforeEach(async function(){
        await productsModel.deleteMany({});
    });

    it("Se debe agregar producto a la base de datos", async function(){
        const mockProd ={
            title: "Polera",
            price:1000,
            code:"B124",
            stock:1,
            category:"Deporte"
        }
        const result = await this.productsMongo.createProduct(mockProd)
        expect(result).to.be.an("object").to.have.property("_id")
    });
    
    it("Se debe modificar producto en base de datos", async function(){
        const mockProd ={
            title: "Camiseta",
            price:2000,
            code:"G134",
            status:true,
            stock:2,
            category:"Deporte"
        }
        const result = await this.productsMongo.createProduct(mockProd)
        const productId = result._id;
        const update = {...mockProd};
        update.category = "Ropa";
        const resultUpdate = await this.productsMongo.updateProduct(productId, update);
        
        expect(resultUpdate.category).to.be.equal("Ropa")
    });

    it("Se debe eliminar un producto a la base de datos", async function(){
        const mockProd ={
            title: "Calcetines",
            price:500,
            code:"F541",
            status:true,
            stock:3,
            category:"Deporte"
        }
        const result = await this.productsMongo.createProduct(mockProd)
        const productId = result._id;
        const finalResult = await this.productsMongo.deleteProduct(productId);
        
        expect(finalResult).to.include({message: `Producto eliminado ${productId}`});
    });

})

/*
it("El resultado debe estar en formato para mostrar los productos", async function(){
    const result = await this.productsMongo.getPaginate();
    expect(result).to.be.an("object");
});
*/