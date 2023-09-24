console.log("Vista Ticket");

//agregar envio de correo al hacer clic en "Buy"
//actualizar stock del producto post compra

const purchaseProcess = async (cid) => {
    const cartId = cid;
    console.log(cartId)
    try {
        if (cartId) {
        const resp = await fetch(`http://localhost:8080/api/carts/${cartId}/purchase/${ticketId}`, {

            method: "DELETE",
        });
        const result = await resp.json();
        const reload = (window.location.href = `http://localhost:8080/totalProducts`);
        console.log("producto eliminado:",productId)
        } else {
            console.log("El producto no existe");
        }
    } catch (error) {
        console.log("Error: no se puede borrar el producto", error.message);
    }
};
