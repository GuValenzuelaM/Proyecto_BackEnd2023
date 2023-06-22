//Prueba de sincronización
console.log("javascript products");

const addToCart = async(productId)=>{
    console.log("Este sera el producto a agregar", productId);
    fetch("http://localhost:8080/",{

    })
};

/*
const addToCart = async(productId)=>{
    try {
        //Verifica si existe el Producto y el carrito
        if (productId && cartId) {
            //Se genera una solicitud POST al servidor
            const newProduct = await fetch(
                `http://localhost:8080/api/carts/${cartId}/product/${productId}`,
                {
                    method: "POST",
                }
            );
            //
            const newCartProduct = await newProduct.json();
            console.log("resultado", newCartProduct);

            if (newCartProduct.status == "success") {
                const response = await fetch(
                    `http://localhost:8080/api/carts/${cartId}`,
                    {
                        method: "GET",
                    }
                );
                console.log(response);
            }
        }
    } catch (error) {
        console.log("Error al agregar producto al carrito", error.message);
    }
};
*/