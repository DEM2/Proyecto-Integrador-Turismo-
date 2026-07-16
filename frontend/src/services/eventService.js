
import { apiUrl } from "./apiConfig.js";

export async function getEventDetail(id_event) {
    
    if(!id_event){
        throw new Error("ID not found")
        return
    }
    
    const response = await fetch(apiUrl(`/api/events/${id_event}`))
    if(!response.ok){
        throw new Error(
            "Error al realizar la consulta de detalle de evento.")
    }

    const eventDetail = await response.json()
    if(!eventDetail.data){
        return null
    }

    return eventDetail.data
}

export async function postEvent(event) {
    const response = await fetch(apiUrl(`api/organizer/createEvent`), {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(event)
    });

    const result = await response.json()

    if(!response.ok){
        throw new Error("Error al crear el evento")
    }

    return result;
}