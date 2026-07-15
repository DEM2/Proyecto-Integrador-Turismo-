
import { apiUrl } from "./apiConfig.js";

export async function getReviews(userId) {
    const response = await fetch(apiUrl(`/api/reviews/${userId}`));
    if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message || "Error al obtener las reseñas");
    }

   return await response.json()
}
