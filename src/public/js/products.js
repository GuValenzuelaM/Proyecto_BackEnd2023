console.log("javascript products");

const addToCart = async (productId) => {
    try {
        const userCart = await fetch(
			`http://localhost:8080/cart`,
			{
				method: "get",
			}
		);
		const cartId = await userCart.json();

        if (productId && cartId) {
            const resp = await fetch(
                `http://localhost:8080/api/carts/${cartId}/product/${productId}`,
                {
                    method: "POST",
                }
            );
            const result = await resp.json();
            console.log("resultado", result);
            
            if (result.status == "success") {
                const payload = await fetch(
                    `http://localhost:8080/api/carts/${cartId}`,
                    {
                        method: "GET",
                    }
                    );
                    const cart = await payload.json();
                    console.log("cart", cart.data);
                }
            }
    } catch (error) {
        console.log("Error: obtener el carrito", error.message);
    }
}

const redirectToCart = async () => {
    try {
        const resp = await fetch(`http://localhost:8080/cart`, {
            method: "GET",
        });
        const cartId = await resp.json();
        if (cartId) {
            //window.location.href = `http://localhost:8080/api/carts/${cartId}`;
            window.location.href = `http://localhost:8080/cart/${cartId}`;  
        } else {
            console.log("El carrito no existe");
        }
    } catch (error) {
        console.log("Error: obtener el carrito", error.message);
    }
};