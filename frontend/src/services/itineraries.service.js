import { apiUrl } from "./apiConfig.js";

const API_URL = apiUrl("/api/itineraries");

/**
 * Obtiene todos los itinerarios del usuario autenticado
 */
export async function getUserItineraries(userId) {

   
  const response = await fetch(`${API_URL}/${userId}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error al obtener los itinerarios");
  }

  return data;
}

/**
 * Crea un nuevo itinerario
 */
export async function createItinerary(itinerary) {

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(itinerary),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error al crear el itinerario");
  }

  return data;
}

/**
 * Agrega un lugar a un itinerario
 */
export async function addPlaceToItinerary(itineraryId, placeId) {

  const response = await fetch(
    `${API_URL}/${itineraryId}/places`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_place: placeId,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "No fue posible agregar el lugar");
  }

  return data;
}

/**
 * Agrega un evento a un itinerario
 */
export async function addEventToItinerary(itineraryId, eventId) {
  console.log("llegue", eventId)
  const response = await fetch(
    `${API_URL}/${itineraryId}/events`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_event : eventId,
      }),
    }
  );

  const data = await response.json();
  console.log(data)
  if (!response.ok) {
    throw new Error(data.message || "No fue posible agregar el evento");
  }

  return data;
}

export async function getItineraryDetail(id){

    const response = await fetch(`${API_URL}/${id}/itinerary`);

    const data = await response.json();

    if(!response.ok){
        throw new Error(data.message);
    }

    return data;

}


/**
 * Elimina un itinerario junto con los lugares y eventos
 * registrados en él (eliminación en cadena a cargo del backend)
 */
export async function deleteItinerary(id) {

  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {

    const data = await response.json().catch(() => ({}));

    throw new Error(data.message || "No fue posible eliminar el itinerario");
  }

  return true;
}