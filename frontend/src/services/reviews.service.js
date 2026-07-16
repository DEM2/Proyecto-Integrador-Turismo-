
import { apiUrl } from "./apiConfig.js";

export async function getReviews(userId) {
    const response = await fetch(apiUrl(`/api/reviews/${userId}`));
    if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message || "Error al obtener las reseñas");
    }

   return await response.json()
}

export async function getReviewsOrganizador(userId) {
    
    const response = await fetch(apiUrl(`/api/reviewsorganizador/${userId}`));
    if (!response.ok) {
        
    const error = await response.json().catch(() => null);
    throw new Error(error?.message || "Error al obtener las reseñas");
    }

   return await response.json()
}


export async function getSitesOrganizador(userId) {
    
    const response = await fetch(apiUrl(`/api/sitesorganizador/${userId}`));
    if (!response.ok) {
        
    const error = await response.json().catch(() => null);
    throw new Error(error?.message || "Error al obtener las reseñas");
    }

   return await response.json()
}

export async function countReviewsOrganizador(userId) {
    
    const response = await fetch(apiUrl(`/api/countreviewsorganizador/${userId}`));
    
    if (!response.ok) {
        
    const error = await response.json().catch(() => null);
    throw new Error(error?.message || "Error al obtener las reseñas");
    }

   return await response.json()
}

export async function countSitesOrganizador(userId) {
    
    const response = await fetch(apiUrl(`/api/countsites/${userId}`));
    
    if (!response.ok) {
        
    const error = await response.json().catch(() => null);
    throw new Error(error?.message || "Error al obtener los sitios");
    }

   return await response.json()
}

export async function countEventsOrganizador(userId) {
    
    const response = await fetch(apiUrl(`/api/countevents/${userId}`));
    
    if (!response.ok) {
        
    const error = await response.json().catch(() => null);
    throw new Error(error?.message || "Error al obtener los eventos");
    }

   return await response.json()
}
