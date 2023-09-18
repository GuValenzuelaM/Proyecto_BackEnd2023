import {logger} from "../../utils/logger.js";

logger.debug("carts");

const purchase = async ()=> {

    try {
		const resp = await fetch(
			`http://localhost:8080/user-cart`,
			{
				method: "get",
			}
		);

        const cartId = await resp.json();
        console.log(cartId)

        const res = await fetch(
            `http://localhost:8080/api/carts/${cartId}/purchase`,
            {
                method: "POST",
            }
        );
        const result = await res.json();


        const viewTicket = 
		(window.location.href = `http://localhost:8080/ticket`)
		
	} catch (error) {
		console.log(error.message)
	}
}