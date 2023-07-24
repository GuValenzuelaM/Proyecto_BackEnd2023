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
    const userRole = req.user.rol;
    if (userRole === "admin") {
        next();
    } else {
        res.send('No cuentas con los permisos para realizar esta acción <a href="/home">Volver a inicio</a>');
    }
};

//Verificación de usurio y carrito
const verifyUserCart = (req, res, next) => {
    const userRole = req.user.rol;
    const userCart = req.user.cart;
    const requestedCart = req.params.cid;

    // Verificamos si el usuario es "user" y si su carrito es igual al carrito solicitado
    if (userRole === "user" && userCart === requestedCart) {
        next(); // El usuario es dueño del carrito, pasamos al siguiente middleware o ruta
    } else {
        res.send('No tienes permisos para modificar el carrito. <a href="/home">Volver a inicio</a>');
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

export {isLoggedIn, isAdmin, verifyUserCart, checkUserAuthenticatedView, showAuthView, checkRoles}