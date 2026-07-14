
export async function getDestinations(){
    const response = await fetch("http://localhost:3000/api/destinations");
    if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message || "Error al obtener los Sitios destacados");
  }

  return await response.json()
}
