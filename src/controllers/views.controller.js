export class ViewsController{
    static renderHome = (req,res)=>{
        res.render("home");
    };

    static renderLogin = (req,res)=>{
        res.render("login");
    };

    static renderSignup = (req,res)=>{
        res.render("signup");
    };

    static renderProfile = (req,res)=>{
        // console.log(req.user);
        res.render("profile",{user:req.user});
    };

    //Función para listar productos filtrados ,ordenados y paginados
    static getProducts = async(req,res)=>{
        try {
            const {limit=10,page=1,sort,category,stock} = req.query;
            if(!["asc","desc"].includes(sort)){
                res.json({status:"error", message:"ordenamiento no valido, solo puede ser asc o desc"});
            };
            const sortValue = sort === "asc" ? 1 : -1;
            const stockValue = stock === 0 ? undefined : parseInt(stock);
            console.log("limit: ", limit, "page: ", page, "sortValue: ", sortValue, "category: ", category, "stock: ", stock);
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
            //baseUrl: http://localhost:8080/api/products
            
            //Define ruta variable del localhost
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
                prevPage: result.prevPage,
                nextPage: result.nextPage,
                page:result.page,
                hasPrevPage:result.hasPrevPage,
                hasNextPage:result.hasNextPage,
                prevLink: result.hasPrevPage ? `${baseUrl}?page=${result.prevPage}` : null,
                nextLink: result.hasNextPage ? `${baseUrl}?page=${result.nextPage}` : null,
            }
            console.log("response: ", response);
            res.json(response); 
        } catch (error) {
            res.json({status:"error", message:error.message});
        }
    };

    //Entrega carro del usuario activo 
    static getCart = async(req,res)=>{
        res.json(req.user.cart)
    }
}