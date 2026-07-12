
export async function getEventDetail(id_event) {
    
    if(!id_event){
        throw new Error("ID not found")
        return
    }
    
    const response = await fetch(`http://localhost:3000/api/events/${id_event}`)
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
