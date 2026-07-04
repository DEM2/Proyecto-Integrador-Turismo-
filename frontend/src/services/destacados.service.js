
// Funcion para obtener los destacados
export async function getSitiosDestacados() {
  const response = await fetch("http://localhost:3000/api/destacados/sitios");

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message || "Error al obtener los Sitios destacados");
  }
  return await response.json();
}

export async function getEventosDestacados() {
  const response = await fetch("http://localhost:3000/api/destacados/eventos");
    if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message || "Error al obtener los Eventos destacados");
  } 
    return await response.json();
}