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

    async getTicket(email){
        try {
            const ticket = await this.model.findById(email);
            if(!ticket){
                throw new Error(`No se ha encontrado el ticket ${ticket}`)
            } else{
                return JSON.parse(JSON.stringify(ticket));
                logger.debug(`el ticket ${ticket} existe en el arreglo de tickets`)
            }
        } catch (error) {
            throw new Error(`Error al obtener ticket ${error.message}`);
        }
    };

}