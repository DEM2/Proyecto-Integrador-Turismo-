
import { apiUrl } from "./apiConfig.js";
import { getDestinations } from "./destinationService.js";

function getPlaceKey(place) {
  const name = String(place?.place ?? place?.name ?? "").trim().toLowerCase();
  const address = String(place?.address ?? "").trim().toLowerCase();

  return `${name}|${address}`;
}

// Funcion para obtener los lugares destacados
export async function getSitiosDestacados() {
  
  const response = await fetch(apiUrl("/api/destacados/sitios"));

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message || "Error al obtener los lugares destacados");
  }
  
  const featuredPlaces = await response.json();

  if (featuredPlaces.every((place) => place.id ?? place._id)) {
    return featuredPlaces;
  }

  try {
    const allPlaces = await getDestinations();
    const placesByKey = new Map(
      allPlaces.map((place) => [getPlaceKey(place), place])
    );

    return featuredPlaces.map((place) => {
      const matchingPlace = placesByKey.get(getPlaceKey(place));

      return {
        ...place,
        id: place.id ?? place._id ?? matchingPlace?.id ?? matchingPlace?._id,
      };
    });
  } catch {
    return featuredPlaces;
  }
}

// Funcion para obtener los eventos destacados
export async function getEventosDestacados() {
  
  const response = await fetch(apiUrl("/api/destacados/eventos"));
    if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message || "Error al obtener los Eventos destacados");
  } 
    return await response.json();
}
