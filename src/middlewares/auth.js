import { ProductsService } from "../repository/products.services.js";

//Verificación inicio de session
const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.send('Por favor inicia sesión. <a href="/signup">Intentar de nuevo</a>');
    } 
};

//Verificación de rol admin
const isAdmin = (req, res, next) => {
    const userRole = req.user.role;
    if (userRole === "admin") {
        next();
    } else {
        res.send('No cuentas con los permisos para realizar esta acción <a href="/home">Volver a inicio</a>');
    }
};

const canAddProducts = (req, res, next) => {
    const userRole = req.user.role;
    const allowedRoles = ["admin", "premium"];
    if (allowedRoles.includes(userRole)) {
        next();
    } else {
        res.send('No tienes autorización para agregar los productos <a href="/home">Volver al home</a></div>');
    }
};

const canEditProducts = async (req, res, next) => {
    const userId = req.user._id;
    const userRole = req.user.role;
    const productId = req.params.pid;
    try {
        const product = await ProductsService.getProductById(productId);
        const productOwner = JSON.parse(JSON.stringify(product.owner));
        if (productOwner === userId || userRole === "admin") {
            next();
        } else {
            res.send('No tienes autorización para hacer esta acción<a href="/home">Volver al home</a></div>');
        }
    } catch (error) {
        res.send('Error al verificar los permisos');
    }
};

const addOwnProduct = async (req, res, next) => {
    const userId = req.user._id;
    const productId = req.params.pid;
    try {
        const product = await ProductsService.getProductById(productId);
        const productOwner = JSON.parse(JSON.stringify(product.owner));
        if (userId == productOwner) {
            res.send('Acción no válida, solo puedes editar tu carro<a href="/home">Volver al home</a></div>');
        } else {
            next();
        }
    } catch (error) {
        res.send('Error al verificar el producto');
    }
};

const verifyUserCart = (req, res, next)=>{
    const userRole = req.user.role;
    const userCart = req.user.cart;
    const cartId = req.params.cid;
    if (userRole === "user" || userRole === "admin" && userCart == cartId) {
        next();
    } else {
        res.send('No tienes autorización para editar el carrito <a href="/home">Volver al home</a></div>');
    }
};

//
const checkUserAuthenticatedView = (req,res,next)=>{
    if(req.user){
        next();
    } else {
        // res.json({status:"error", message:"Debes estar autenticado"});
        res.send("<p>Debes estar autenticado <a href='/login'>Ir a inicio de sesión</a></p>")
    }
};

//
const showAuthView = (req,res,next)=>{
    if(req.user){
        res.redirect("/profile");
    } else {
        next();
    }
}

//Autorización por rol
const checkRoles = (urlRoles)=>{
    return (req,res,next)=>{
        if(!urlRoles.includes(req.user.role)){
            return res.send("<p>No tienes permisos <a href='/'>Ir a inicio</a></p>")
        } else {
            next();
        }
    }
};

export {isLoggedIn,isAdmin,canAddProducts,canEditProducts,addOwnProduct,verifyUserCart,checkUserAuthenticatedView,showAuthView,checkRoles}