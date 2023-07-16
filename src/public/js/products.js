//Prueba de sincronización
console.log("javascript products");

const addToCart = async(productId)=>{
    console.log("Este sera el producto a agregar", productId);
    fetch("http://localhost:8080/",{

    })
};

/*
const addToCart = async(productId)=>{
    console.log("Producto agregado", productId);
    try {
        const result = await fetch(
			`http://localhost:8080/api/carts/648fcab6b1fb8991f8ed2bf7/`,
			{
				method: "get",
			}
		);

		const cartId = await result.json();
		console.log(cartId)

        //Verifica si existe el Producto y el carrito
        if (productId && cartId) {
            //Se genera una solicitud POST al servidor
            const result = await fetch(
                `http://localhost:8080/api/carts/${cartId}/product/${productId}`,
                {
                    method: "POST",
                }
            );
            //
            const newCartProduct = await result.json();
            console.log("resultado", newCartProduct);

            if (newCartProduct.status == "success") {
                const response = await fetch(
                    `http://localhost:8080/api/carts/${cartId}`,
                    {
                        method: "GET",
                    }
                );
                const cart = await response.json();
                console.log(cart.data);
            }
        }
    } catch (error) {
        console.log("Error al agregar producto al carrito", error.message);
    }
};
*/