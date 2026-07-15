const API_URL = "http://localhost:3000/api/itineraries";

/**
 * Obtiene todos los itinerarios del usuario autenticado
 */
export async function getUserItineraries() {

  const response = await fetch(API_URL, {
    credentials: "include"
  });

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
      credentials: "include",
      body: JSON.stringify({
        place_id: placeId,
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

  const response = await fetch(
    `${API_URL}/${itineraryId}/events`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        event_id: eventId,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "No fue posible agregar el evento");
  }

  return data;
}