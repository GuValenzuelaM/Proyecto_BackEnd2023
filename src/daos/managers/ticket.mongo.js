import {ticketsModel} from "../models/ticket.model.js";

export class Tickets{

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
}