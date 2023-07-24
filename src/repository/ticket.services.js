//Importa el Dao desd el módulo "factory"
import {ticketsDao} from "../daos/factory.js";

export class TicketService {
    //Creación de un ticket nuevo
    static async createTicket(ticket) {
        return ticketsDao.createTicket(ticket);
    };
}