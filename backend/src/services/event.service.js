import pool from "../config/db.js";
import { getEventAgendaById, getEventById } from "../querys/event.query.js";

export async function getEventService(id_event) {
    const event = await getEventById(id_event)

    if(!event){
        const error = new Error("Evento no encontrado")
        error.statusCode = 404;
        throw error;
    }

    const agenda = await getEventAgendaById(id_event)
    
    return {
        id: event.id,
        id_category: event.id_category,
        location : event.location,
        description : event.description,
        start_date : event.start_date,
        end_date : event.end_date,
        start_time : event.start_time,
        price : event.price,
        address : event.address,
        image_main : event.image_main,
        category_name : event.category_name,
        agenda: agenda
    }

}



