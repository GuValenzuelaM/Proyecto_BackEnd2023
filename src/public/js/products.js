let cartDiv = document.getElementById("cartDiv");
let productsDiv = document.getElementById("productsDiv");

//router.post("/:cid/product/:pid"
const addToCart = async(cartId, productId)=>{
    try {
        if(cartId){
            if(productId){    
            const response = await fetch(`http://localhost:8080/${cartId}/product/${productId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({cartId, productId,quantity})
            });
            console.log("Se han agregado" `${quantity} "unidades del producto" ${productId}`);
            res.render("carts", {data:cart})
            } else {
                //AGREGAR PRODUCTO AL CARRO DE COMPRA
                console.log("Se han agregado" `${quantity} "unidades del producto" ${productId}`);
                res.render("carts", {data:cart})
            }
        } else {
            //CREAR CARRO DE COMPRAS
        }        
        }catch (error) {
        console.log("El producto no se agregó debido al error:", error);
    }
};

/*
uter.post("/:cid/product/:pid"
const addToCart = async(cartId, productId,quantity)=>{
    try {
        if(cartId && productId){
            const response = await fetch(`http://localhost:8080/${cartId}/product/${productId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({cartId, productId,quantity})
            });
            console.log("Se han agregado" `${quantity} "unidades del producto" ${productId}`);
            res.render("carts", {data:cart})
        } else 

        if (response) {
            console.log("Producto agregado", productId);
        } else {
          console.log("Error al agregar el producto al carrito.");
        }
        }catch (error) {
        console.log("El producto no se agregó debido al error:", error);
    }
};
*/


//router.delete('/api/carts/:cid'
const deleteToCart = async(cartId)=>{
    try {
        const response = await fetch(`http://localhost:8080/cart/${cartId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(cartId)
        });

        if (response) {
            console.log("Carrito Eliminado", productId);
        } else {
          console.log("Error al eliminar el carrito.");
        }
        }catch (error) {
        console.log("El carrito no se eliminó debido al error:", error);
    }
};