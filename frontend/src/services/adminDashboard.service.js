import { apiUrl } from "./apiConfig.js";

let adminDashboardDataPromise = null;

const emptyAdminDashboardData = {
  counts: {
    users: 0,
    events: 0,
    places: 0,
    reviews: 0,
    pendingOrganizers: 0,
  },
  pendingOrganizers: [],
  recentReviews: [],
};

export async function getAdminDashboardData() {
  if (adminDashboardDataPromise) {
    return adminDashboardDataPromise;
  }

  adminDashboardDataPromise = fetchAdminDashboardData().catch((error) => {
    console.error(error);
    adminDashboardDataPromise = null;
    return emptyAdminDashboardData;
  });

  return adminDashboardDataPromise;
}

export async function hideAdminDashboardReview(reviewType, reviewId) {
  const response = await fetch(apiUrl(`/api/admin-dashboard/reviews/${reviewType}/${reviewId}`), {
    method: "PATCH",
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message || "Error al ocultar la resena");
  }

  adminDashboardDataPromise = null;
  return await response.json();
}

export async function showAdminDashboardReview(reviewType, reviewId) {
  const response = await fetch(apiUrl(`/api/admin-dashboard/reviews/${reviewType}/${reviewId}/show`), {
    method: "PATCH",
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message || "Error al mostrar la resena");
  }

  adminDashboardDataPromise = null;
  return await response.json();
}

export async function getAdminDashboardAllReviews() {
  const response = await fetch(apiUrl("/api/admin-dashboard/reviews"));

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message || "Error al obtener las resenas");
  }

  const payload = await response.json();
  return payload?.data ?? [];
}

export async function getAdminDashboardAllEvents() {
  const response = await fetch(apiUrl("/api/admin-dashboard/events"));

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message || "Error al obtener los eventos");
  }

  const payload = await response.json();
  return payload?.data ?? [];
}

export async function getAdminDashboardAllPlaces() {
  const response = await fetch(apiUrl("/api/admin-dashboard/places"));

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message || "Error al obtener los sitios");
  }

  const payload = await response.json();
  return payload?.data ?? [];
}

export async function getAdminDashboardAllUsers() {
  const response = await fetch(apiUrl("/api/admin-dashboard/users"));

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message || "Error al obtener los usuarios");
  }

  const payload = await response.json();
  return payload?.data ?? [];
}

export async function getAdminDashboardRoles() {
  const response = await fetch(apiUrl("/api/admin-dashboard/roles"));

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message || "Error al obtener los roles");
  }

  const payload = await response.json();
  return payload?.data ?? [];
}

export async function getAdminDashboardOrganizerRequests() {
  const response = await fetch(apiUrl("/api/admin-dashboard/organizer-requests"));

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message || "Error al obtener las solicitudes de organizador");
  }

  const payload = await response.json();
  return payload?.data ?? [];
}

export async function approveAdminDashboardOrganizer(userId) {
  const response = await fetch(apiUrl(`/api/admin-dashboard/organizer-requests/${userId}/approve`), {
    method: "PATCH",
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message || "Error al aprobar la solicitud");
  }

  adminDashboardDataPromise = null;
  return await response.json();
}

export async function rejectAdminDashboardOrganizer(userId) {
  const response = await fetch(apiUrl(`/api/admin-dashboard/organizer-requests/${userId}`), {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message || "Error al rechazar la solicitud");
  }

  adminDashboardDataPromise = null;
  return await response.json();
}

export async function updateAdminDashboardEvent(eventId, eventData) {
  const response = await fetch(apiUrl(`/api/admin-dashboard/events/${eventId}`), {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message || "Error al actualizar el evento");
  }

  adminDashboardDataPromise = null;
  return await response.json();
}

export async function updateAdminDashboardPlace(placeId, placeData) {
  const response = await fetch(apiUrl(`/api/admin-dashboard/places/${placeId}`), {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(placeData),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message || "Error al actualizar el sitio");
  }

  adminDashboardDataPromise = null;
  return await response.json();
}

export async function updateAdminDashboardUser(userId, userData) {
  const response = await fetch(apiUrl(`/api/admin-dashboard/users/${userId}`), {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message || "Error al actualizar el usuario");
  }

  adminDashboardDataPromise = null;
  return await response.json();
}

async function fetchAdminDashboardData() {
  const response = await fetch(apiUrl("/api/admin-dashboard"));

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message || "Error al obtener la informacion del dashboard");
  }

  const payload = await response.json();

  return payload?.data ?? emptyAdminDashboardData;
}
