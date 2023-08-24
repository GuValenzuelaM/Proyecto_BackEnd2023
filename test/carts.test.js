import mongoose from "mongoose"
import chai from "chai"
import {CartsMongo} from "../src/daos/managers/carts.mongo.js"
import {ProductsMongo} from "../src/daos/managers/products.mongo.js"
import {cartsModel} from "../src/daos/models/carts.model.js"

const expect = chai.expect

describe("Testing carts DAO", ()=>{
    before(async function(){
        await mongoose.connect("mongodb+srv://guvalenzuelam:Coder2023@coderhouse.zqpfl7k.mongodb.net/sessionsDB?retryWrites=true&w=majority");
        this.cartsMongo = new CartsMongo();
        this.productMongo = new ProductsMongo();
    });

    beforeEach(async function(){
    });

    it("Se debe crear un carrito en base de datos", async function(){
       
        const result = await this.cartsMongo.addCart()
        expect(result).to.be.an("object").to.have.property("_id")
    });

    it("Se debe agregar un producto al carrito en base de datos", async function(){
        const mockProd ={
            title: "Polera",
            description:"Azul Marino",
            price:1000,
            code:"B124",
            status:true,
            stock:3,
            category:"Deporte"
        }
        const addProduct = await this.productMongo.addProduct(mockProd)
        
        const cart = await this.cartsMongo.addCart();
        const cid = cart._id.toString();
        const pid = addProduct._id.toString();

        const result = await this.cartsMongo.addProductToCart(cid, pid)
        expect(result).to.be.an("array").to.have.any.key("_id","products", "0");
        })
}) 