
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
    const response = await fetch(apiUrl(`/api/organizer/createEvent`), {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(event)
    });

    let result = {};

    try {
        result = await response.json();
    } catch (error) {
        result = {};
    }

    if (!response.ok) {
        throw new Error(result?.message || "Error al crear el evento");
    }

    return result;
}

export async function getAllEvent() {
  
  const response = await fetch(apiUrl("/api/events"));
  
    if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message || "Error al obtener los Eventos");
  } 
    return await response.json();
}
