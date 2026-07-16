import { createEventByUser, getEventAgendaById, getEventById, createEventAgenda } from "../querys/event.query.js";

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
        name: event.name,
        id_category: event.id_category,
        description: event.description,
        start_date: event.start_date,
        end_date: event.end_date,
        start_time: event.start_time,
        price: event.price,
        address: event.address,
        image_main: event.image_main,
        category_name: event.category_name,
        agenda
    };

}

export async function createEventService(eventData) {
    const start_date = new Date(eventData.start_date)
    const end_date = new Date(eventData.end_date)
    const currentDate = new Date()

    if(start_date < currentDate || end_date < currentDate){
        const error = new Error(
            "Las fechas del evento deben ser superior a la fecha actual"
        )
        error.statusCode = 400
        throw error;
    }

    if(start_date > end_date){
        const error = new Error(
            "La fecha final no puede ser anterior a la fecha inicial"
        )
        error.statusCode = 400
        throw error;
    }

    if(eventData.price < 0){
        const error = new Error(
            "El precio no puede ser negativo"
        )
        error.statusCode = 400
        throw error;
    }

    const newEvent = await createEventByUser(eventData)

    const agendaCreated = await createEventAgenda(newEvent.id, eventData.agenda)

    return newEvent;
}



