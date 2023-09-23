//NO OPERATIVO
import {logger} from "../../utils/logger.js";

logger.debug("carts");

const purchase = async ()=> {

    try {
		const resp = await fetch(
			`http://localhost:8080/api/cart`,
			{
				method: "get",
			}
		);

        const cartId = await resp.json();
        console.log("cartId:",cartId)

        const res = await fetch(
            `http://localhost:8080/cart/${cartId}/purchaseCart`,
            {
                method: "POST",
            }
        );
        const result = await res.json();
        console.log("result:",result)


        const viewTicket = 
		(window.location.href = `http://localhost:8080/ticket`)
		
	} catch (error) {
		console.log(error.message)
	}
}