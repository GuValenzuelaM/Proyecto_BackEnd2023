/*
export const generateUserErrorInfo = (user)=>{
    return `
        Uno o mas campos no estas completos.
        Lista de campos requeridos:
        name:Este campo recibe string, pero se recibio ${user.name},
        lastname:Este campo recibe string, pero se recibio ${user.lastname},
        email:Este campo recibe string, pero se recibio ${user.email},
    `
};
*/

export class ErrorServices{
    static orderError = (req,res)=>{
        return `
        El orden de los productos solo puede ser asc o desc
        El campo recibido fue: ${sort}`
    };

    static productIdError = (req,res)=>{
        return `
        El Id del producto no es valido, el valor recibido fue: ${id}`
    };

    static cartIdError = (req,res)=>{
        return `
        El Id del carrito no fue encontrado, el valor recibido fue: ${cartId}`
    };

    static addProductIdError = (req,res)=>{
        return `
        No se pudo agregar el producto al carrtio. Los datos recibidos son: ProductId:${productId} y cartId:${cartId}`
    };

    static deleteProductIdError = (req,res)=>{
        return `
        No se pudo eliminar el producto del carrtio. Los datos recibidos son: ProductId:${productId} y cartId:${cartId}`
    };

    static deleteProductIdError = (req,res)=>{
        return `
        No se pudo eliminar el producto del carrtio. Los datos recibidos son: ProductId:${productId} y cartId:${cartId}`
    };

    static updateQuantityError = (req,res)=>{
        return `
        No se pudo actualizar los datos del carrito. Los datos recibidos son: ProductId:${productId} y cartId:${cartId}`
    };



}

