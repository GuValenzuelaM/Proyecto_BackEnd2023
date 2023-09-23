import mongoose from "mongoose";

//NOMBRE DEL ARREGLO
const totalTickets = "tickets";

// ESQUEMA DE UN TICKET
const ticketSchema = new mongoose.Schema({
    code:{type:String, required:true},
    purchase_datetime:{type:Date},
    amount:{type:Number, required:true},
    purchaser:{type:String, required:true}
});

export const ticketsModel = mongoose.model(totalTickets,ticketSchema);