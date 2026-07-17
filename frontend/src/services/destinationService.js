
import { apiUrl } from "./apiConfig.js";

export async function getDestinations(){
    const response = await fetch(apiUrl("/api/destinations"));
    if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message || "Error al obtener los Sitios destacados");
  }

  return await response.json()
}

export async function postPlace(place) {
  const response = await fetch(apiUrl("/api/organizer/createDestination"), {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(place)
  })

  const result = await response.json()

  if(!response.ok){
    throw new Error(result?.message || "Error al crear el sitio")
  }

  return result
}
