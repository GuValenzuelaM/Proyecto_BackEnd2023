import { Router } from "express";
import { ProductsMongo } from "../daos/managers/products.mongo.js";
import { CartsMongo } from "../daos/managers/carts.mongo.js";

const productsService = new ProductsMongo();
const cartService = new CartsMongo();

const router = Router();

router.get("/",(req,res)=>{
    res.render("home");
});

router.get("/products",async(req,res)=>{
    try {
        const {limit=3,page=1,sort="asc",category,stock} = req.query;
        if(!["asc","desc"].includes(sort)){
            return res.json({status:"error", message:"ordenamiento no valido, solo puede ser asc o desc"})
        };
        const sortValue = sort === "asc" ? 1 : -1;
        const stockValue = stock === 0 ? undefined : parseInt(stock);
        // console.log("limit: ", limit, "page: ", page, "sortValue: ", sortValue, "category: ", category, "stock: ", stock);
        let query = {};
        if(category && stockValue){
            query = {category: category, stock:stockValue}
        } else {
            if(category || stockValue){
                if(category){
                    query={category:category}
                } else {
                    query={stock:stockValue}
                }
            }
        }
        // console.log("query: ", query)
        const baseUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
        console.log("baseUrl", baseUrl);
        //baseUrl: http://localhost:8080/api/products
        const result = await productsService.getPaginate(query, {
            page,
            limit,
            sort:{price:sortValue},
            lean:true
        });
        // console.log("result: ", result);
        const response = {
            status:"success",
            payload:result.docs,
            totalPages:result.totalPages,
            totalDocs:result.totalDocs,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page:result.page,
            hasPrevPage:result.hasPrevPage,
            hasNextPage:result.hasNextPage,
            prevLink: result.hasPrevPage ? `${baseUrl.replace( `page=${result.page}` , `page=${result.prevPage}` )}` : null,
            nextLink: result.hasNextPage ? `${baseUrl.replace( `page=${result.page}` , `page=${result.nextPage}` )}` : null,
        }
        console.log("response: ", response);
        res.render("products",response);
    } catch (error) {
        res.json({status:"error", message:error.message});
    }
});

router.get("/carts/:cid",async(req,res)=>{
    try {
        const cartId = req.params.cid;
        const cart = await cartService.get(cartId);
        console.log(cart);
        res.render("carts",cart);
    } catch (error) {
        res.json({status:"error", message:error.message});
    }
})

router.get("/", (req,res)=>{
    res.render("home");
});

router.get("/login", (req,res)=>{
    res.render("login");
});

router.get("/signup", (req,res)=>{
    res.render("registro");
});

router.get("/forgot", (req,res)=>{
    res.render("restaurar");
});

router.get("/profile", (req,res)=>{
    if(req.user){
        console.log(req.user)
        return res.render("perfil",{
            first_name:req.user.first_name,
            last_name:req.user.last_name,
            age:req.user.age,
            email:req.user.email,
            profileType:req.user.profileType
        });
    } else {
        res.redirect("/login")
    }        
});

router.get("/current",(req,res)=>{
    console.log(req.user);
    res.render("profile",{user:req.user});
});
    
export {router as viewsRouter};
