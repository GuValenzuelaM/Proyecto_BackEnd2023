// IMPORTA EL DAO DE TICKETS DESDE EL MÓDULO "factory"
import { ticketsDao } from "../daos/factory.js";

export class TicketService {
    // CREA UN NUEVO TICKET
    static async createTicket(ticket) {
        return ticketsDao.createTicket(ticket);
    };
}