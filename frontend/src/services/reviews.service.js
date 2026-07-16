
import { apiUrl } from "./apiConfig.js";
import { createSessionStorageData, getSessionStorageData } from "./authService.js";

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


export async function getOrganizerProfileSummary(userId) {
    if (!userId) {
        return {
            counts: {
                reviews: 0,
                sites: 0,
                events: 0,
            },
            events: [],
        };
    }

    const cached = getSessionStorageData();

    if (cached) {
        return cached;
    }

    const response = await fetch(apiUrl(`/api/organizer-profile/${userId}`));
    if (!response.ok) {
        const error = await response.json().catch(() => null);
        throw new Error(error?.message || "Error al obtener el perfil del organizador");
    }

    const payload = await response.json();
    const profileData = payload?.data ?? {
        counts: {
            reviews: 0,
            sites: 0,
            events: 0,
        },
        events: [],
    };

    const normalizedProfileData = {
        counts: profileData.counts ?? {
            reviews: 0,
            sites: 0,
            events: 0,
        },
        events: profileData.events ?? [],
    };

    const cachedData = {
        counts: normalizedProfileData.counts,
        events: (normalizedProfileData.events ?? []).slice(0, 4),
    };

    createSessionStorageData(cachedData);
    return cachedData;
}

export async function getOrganizerAllEvents(userId) {
    if (!userId) {
        return [];
    }

    const response = await fetch(apiUrl(`/api/organizer-profile/${userId}`));
    if (!response.ok) {
        const error = await response.json().catch(() => null);
        throw new Error(error?.message || "Error al obtener los eventos del organizador");
    }

    const payload = await response.json();
    return payload?.data?.events ?? [];
}
