import mongoose from "mongoose"
import chai from "chai"
import {CartsMongo} from "../src/daos/managers/carts.mongo.js"
import {ProductsMongo} from "../src/daos/managers/products.mongo.js"
import {cartsModel} from "../src/daos/models/carts.model.js"

const expect = chai.expect

describe("Testing para carts DAO", ()=>{
    before(async function(){
        await mongoose.connect("mongodb+srv://guvalenzuelam:Coder2023@coderhouse.zqpfl7k.mongodb.net/test?retryWrites=true&w=majority");
        this.cartsMongo = new CartsMongo();
        this.productsMongo = new ProductsMongo();
    });

    beforeEach(async function(){
        await cartsModel.deleteMany({});
    });

    it("Se debe crear un carrito en base de datos", async function(){
        const result = await this.cartsMongo.createCart()
        expect(result).to.be.an("object").to.have.property("_id")
    });

    it("Se debe agregar un producto al carrito en base de datos", async function(){
        const mockProd ={
            title: "Polera",
            price:1000,
            code:"B124",
            stock:1,
            category:"Deporte"
        }
        const newProduct = await this.productsMongo.createProduct(mockProd)
        
        const cart = await this.cartsMongo.createCart();
        const cartId = cart._id.toString();
        const productId = newProduct._id.toString();

        const result = await this.cartsMongo.addProductToCart(cartId, productId)
        //expect(result).to.be.an("array").to.have.any.key("_id","products");
        expect(result._doc).to.be.an("object").to.have.any.key("_id", "products");
    })
}) 