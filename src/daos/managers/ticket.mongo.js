import {ticketsModel} from "../models/ticket.model.js";

export class TicketsMongo{
    constructor(){
        this.model = ticketsModel;
    }

    async createTicket(ticket){
        try {
            const data = await this.model.create(ticket);
            return data;
        } catch (error) {
            throw new Error(`Error, no se ha podido crear el ticket ${error.message}`);
        }
    }

    async getTicket(userId){
        try {
            const ticket = await this.model.findById(userId);
            if(!ticket){
                throw new Error(`el usuario no presenta tickets ${error.message}`);
            } else{
                return JSON.parse(JSON.stringify(ticket));
                logger.debug(`el ticket ${ticket} existe en el arreglo de tickets`)
            }
        } catch (error) {
            throw new Error(`Error al obtener ticket ${error.message}`);
        }
    };

    async stockCheck(productId){
        try {
            const product = await this.model.findById(id);
            if(!product){
                throw new Error(`No se ha encontrado el producto ID ${id}`)
            } else{
                const productStock = product.stock
                const productQ = product.quantity
                const stockCheck = productStock - productQ
                if(stockCheck>=0){
                    return JSON.parse(JSON.stringify(stockCheck));
                    logger.debug(`el producto ${id} tiene stock suficiente`)
                } else {
                    return JSON.parse(JSON.stringify(stockCheck));
                    logger.debug(`el producto ${id} no tiene stock suficiente para ejecutar la compra`)
                }
            }
        } catch (error) {
            throw new Error(`Error al calcular stock del producto ${error.message}`);
        }
    };

    //REVISAR BORRRAR?
    async getTicketByEmail(userEmail){
        try {
            const ticket = await this.model.findOne({ticket:userEmail});
            //const ticket = await this.model.findById(userEmail);
            if(ticket){
                return JSON.parse(JSON.stringify(ticket));
            } else{
                return null;
            }
        } catch (error) {
            throw error;
        }
    };

}