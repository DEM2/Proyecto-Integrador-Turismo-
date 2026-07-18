
import { apiUrl } from "./apiConfig.js";

export async function getDestinations(){
    const response = await fetch(apiUrl("/api/destinations"));
    if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message || "Error al obtener los lugares");
  }

  return await response.json()
}

export async function getCategories() {
  const response = await fetch(apiUrl("/api/categories"));

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message || "Error al obtener las categorías");
  }

  const result = await response.json();
  return result?.data ?? [];
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

export async function getPlaceById(id_place) {
  if(!id_place){
    throw new Error("No se encontro el ID del lugar")
  }

  const response = await fetch(apiUrl(`/api/destinations/${id_place}`))

  const result = await response.json()

  if(!response.ok){
    throw new Error(result?.message || "Error al obtener el lugar")
  }

  return result.data;
}
