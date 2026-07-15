
export async function getReviews(userId) {
    const response = await fetch(`http://localhost:3000/api/reviews/${userId}`);
    if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message || "Error al obtener las reseñas");
    }

   return await response.json()
}

export async function getReviewsOrganizador(userId) {
    
    const response = await fetch(`http://localhost:3000/api/reviewsorganizador/${userId}`);
    if (!response.ok) {
        
    const error = await response.json().catch(() => null);
    throw new Error(error?.message || "Error al obtener las reseñas");
    }

   return await response.json()
}