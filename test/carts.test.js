import mongoose from "mongoose"
import chai from "chai"
import {CartsMongo} from "../src/daos/managers/carts.mongo.js"
import {ProductsMongo} from "../src/daos/managers/products.mongo.js"
import {cartsModel} from "../src/daos/models/carts.model.js"

const expect = chai.expect

describe("Testing para carts DAO", ()=>{
    before(async function(){
        await mongoose.connect("mongodb+srv://guvalenzuelam:Coder2023@coderhouse.zqpfl7k.mongodb.net/Entrega2?retryWrites=true&w=majority");
        this.cartsMongo = new CartsMongo();
        this.productsMongo = new ProductsMongo();
    });

    beforeEach(async function(){
        await cartsModel.deleteMany({});
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
        const addProduct = await this.productsMongo.addProduct(mockProd)
        
        const cart = await this.cartsMongo.addCart();
        const cid = cart._id.toString();
        const pid = addProduct._id.toString();

        const result = await this.cartsMongo.addProductToCart(cid, pid)
        expect(result).to.be.an("array").to.have.any.key("_id","products", "0");
    })

    it("Se debe eliminar un producto del carrito en base de datos", async function(){
        const mockProd ={
            title: "Polera",
            description:"Azul Marino",
            price:1000,
            code:"B124",
            status:true,
            stock:3,
            category:"Deporte"
        }
        const addProduct = await this.productsMongo.addProduct(mockProd)
        const cart = await this.cartsMongo.addCart();
        const cartId = cart._id.toString();
        const productId = addProduct._id.toString();

        const testProduct = await this.manager.addProductToCart(cartId, productId)
        const result = await this.manager.deleteProducts(cartId, productId)
        const [{products}] = result
        expect(products).to.be.an("array").that.is.empty;
    });

    it("Se debe actualizar carrito en base de datos", async function(){
        const cart = await this.cartsMongo.addCart();
        const cartId = cart._id.toString();

        const result = await this.cartsMongo.updateCart(cartId)
        const {status} = result        
        expect(status).to.be.equal("success");
    });
        
    it("Se debe actualizar cantidad del producto en carrito de base de datos", async function(){
        const mockProd ={
            title: "Monitor",
            description:"Samsung",
            price:1000,
            code:"111",
            status:true,
            stock:28,
            category:"Electrónicos"
           }
        const addProduct = await this.pmanager.addProduct(mockProd)
        const cart = await this.cartsMongo.addCart();
        const cartId = cart._id.toString();
        const productId = addProduct._id.toString();

        const testProduct = await this.cartsMongo.addProductToCart(cartId, productId)
        const result = await this.cartsMongo.updateQuantity(cartId, productId, 2)
        const [{products}] = result
        const [{quantity}] = products

        expect(quantity).to.be.equal(3);
    });

    it("Se debe eliminar carrito en base de datos", async function(){
       
        const cart = await this.cartsMongo.addCart();
        const cartId = cart._id.toString();
        const result = await this.cartsMongo.deleteCart(cid)
        const [{products}] = result
        expect(products).to.be.an("array").that.is.empty;
    });
}) 